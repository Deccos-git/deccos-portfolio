import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFirestoreGeneralThree } from "../../firebase/useFirestore";
import { functionsDeccos } from "../../firebase/configDeccos";
import { httpsCallable } from "firebase/functions";
import Location from "../../helpers/Location";
import OutputsGraph from "../outputs/OutputsGraph";
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import Tooltip from "../../components/common/Tooltip";

const DashboardOutputResultsDetail = ({outputId}) => {
    // State
    const [dataArray, setDataArray] = useState([])

    // Hooks
    const navigate = useNavigate()
    const portfolioId = Location()[3]

    // Firestore
    const syncs = useFirestoreGeneralThree('synchronisations', 'portfolioId', portfolioId ? portfolioId : 'none', 'syncItem', outputId ? outputId : 'none', 'status', 'accepted')

    // Get the project results for the syncs
    useEffect(() => {
        if (syncs) {
          const promises = syncs.map(sync => {
            return (async () => {
              const sendOutputDataProject = httpsCallable(functionsDeccos, 'sendOutputDataProject');
              const dataToSend = {
                outputId: sync.projectOutput,
                projectId: sync.compagnyId
              };
              try {
                const result = await sendOutputDataProject({ data: dataToSend });

                console.log(result.data)
  
                return result.data; // Return the data to be collected
              } catch (error) {
                console.error(error);
                return null; // Return null or appropriate error handling
              }
            })();
          });

          Promise.all(promises).then(results => {

            const orderedArray = []

            results.forEach(result => {

              const groupedByMonth = {};

              result.forEach(item => {

                // Desctructure the item
                const { Maand, Resultaat, ProjectID, ProjectName } = item;

                // Create an object with the month as key
                if (!groupedByMonth[Maand]) {
                  groupedByMonth[Maand] = { Maand, Total: 0 };
                }

                // Add the result to the total
                groupedByMonth[Maand].Total += Resultaat;

                // Add the project name to the object
                groupedByMonth[Maand]['Project'] = ProjectName;

                // Add the project ID to the object
                groupedByMonth[Maand]['ProjectID'] = ProjectID;

              });

                // Sort date in ascending order
                const array = Object.values(groupedByMonth).sort((a, b) => {
                  // Split the Maand value into parts
                  const partsA = a.Maand.split('-');
                  const partsB = b.Maand.split('-');
                
                  // Parse year and month from parts
                  const yearA = parseInt(partsA[1], 10);
                  const monthA = parseInt(partsA[0], 10);
                  const yearB = parseInt(partsB[1], 10);
                  const monthB = parseInt(partsB[0], 10);
                
                  // First compare by year
                  if (yearA !== yearB) {
                    return yearA - yearB;
                  }
                
                  // If the year is the same, compare by month
                  return monthA - monthB;
                });

              orderedArray.push(array)

            })

            setDataArray(orderedArray)
          });
        }
    }, [syncs])

    console.log(dataArray)

  return (
    <>
      {dataArray.length > 0 && dataArray.map((data, index) => (
        <div>
          <div className='sidebar-link-container' onClick={() => navigate(`/dashboard/organisation/${portfolioId}/${data[0].ProjectID}`)}>
            <BusinessOutlinedIcon className='menu-icon'/>
            <Tooltip content='Bekijk projectpagina' top='40px'>
              <p id='dashboard-output-detail-compagny-text'><b>{data[0].Project}</b></p>
            </Tooltip>
          </div>
          <OutputsGraph data={data} uniqueIds={null}/>      
        </div>
      ))}
    </>
    
  )
}

export default DashboardOutputResultsDetail