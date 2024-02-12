import { useState, useEffect } from 'react'
import OutputsGraph from '../outputs/OutputsGraph'
import ProjectMeta from '../synchronisations/ProjectMeta'
import { functionsDeccos } from "../../firebase/configDeccos";
import { httpsCallable } from "firebase/functions";
import Location from "../../helpers/Location";
import { useFirestoreGeneralThree } from "../../firebase/useFirestore";
import { useNavigate } from "react-router-dom";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Tooltip from "../../components/common/Tooltip";

const DashboardOutputResults = ({outputId}) => {
    // State
    const [data, setData] = useState([])

     // Hooks
     const portfolioId = Location()[3]
     const navigate = useNavigate()

    // Firestore
    const syncs = useFirestoreGeneralThree('synchronisations', 'portfolioId', portfolioId ? portfolioId : 'none', 'syncItem', outputId ? outputId : 'none', 'status', 'accepted')

    const testData = [
      {
        Maand: '1-11-2024',
        Total: 25,
        CompagnyA: 5,
        CompagnyB: 15,
        CompagnyC: 5
      }
    ]

    // Get the project results for the syncs
    useEffect(() => {
      if (syncs) {
        const promises = syncs.map(sync => {
          return (async () => {
            const sendOutputData = httpsCallable(functionsDeccos, 'sendOutputData');
            const dataToSend = {
              outputId: sync.projectOutput
            };
            try {
              const result = await sendOutputData({ data: dataToSend });

              return result.data; // Return the data to be collected
            } catch (error) {
              console.error(error);
              return null; // Return null or appropriate error handling
            }
          })();
        });
    
        Promise.all(promises).then(results => {
          // Filter out null values if any error occurred
          const filteredResults = results.filter(result => result !== null);

          // Create an flattened array
          const flattenedResults = filteredResults.flat()
          const groupedByMonth = {};

          flattenedResults.forEach(item => {
            const { Maand, Resultaat, ProjectID } = item;
            if (!groupedByMonth[Maand]) {
              groupedByMonth[Maand] = { Maand, Total: 0 };
            }
            groupedByMonth[Maand].Total += Resultaat;
            // Gebruik ProjectID direct als sleutel voor het bedrijf
            groupedByMonth[Maand][ProjectID] = (groupedByMonth[Maand][ProjectID] || 0) + Resultaat;
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
          console.log(array)
          setData(array)

        });
      }
    }, [syncs]);

  return (
    <>
    <OutputsGraph data={data}/>
    <div className='sidebar-link-container' id='dashboard-graph-details-container'>
      <Tooltip content='Details bekijken van output resultaten' top='40px'>
          <SearchOutlinedIcon onClick={() => navigate(`/dashboard/outputresultsdetail/${portfolioId}/${outputId}`)}/>
        </Tooltip>
        <Tooltip content='Details bekijken van output resultaten' top='40px'>
          <p id='dashboard-graph-details-text' onClick={() => navigate(`/dashboard/outputresultsdetail/${portfolioId}/${outputId}`)}>Details</p>
      </Tooltip>
    </div>
    </>
  )
}

export default DashboardOutputResults