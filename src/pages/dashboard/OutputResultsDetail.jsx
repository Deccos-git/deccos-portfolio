import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import OutputMeta from '../../components/outputs/OutputMeta'
import Location from '../../helpers/Location'
import { useFirestoreGeneralThree } from "../../firebase/useFirestore";
import OutputsGraph from '../../components/outputs/OutputsGraph'
import { useState, useEffect } from 'react'
import { functionsDeccos } from "../../firebase/configDeccos";
import { httpsCallable } from "firebase/functions";

const OutputResultsDetail = () => {
    const [data, setData ] = useState([])

    // Hooks
    const portfolioId = Location()[3]
    const outputId = Location()[4]

    // Firestore
    const syncs = useFirestoreGeneralThree('synchronisations', 'portfolioId', portfolioId ? portfolioId : 'none', 'syncItem', outputId ? outputId : 'none', 'status', 'accepted')

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
            setData(array)
  
          });
        }
      }, [syncs]);

  return (
    <div className='page-container'>
        <div className='page-top-container'>
        <div className='page-header-title-container'>
            <SearchOutlinedIcon/>
            <h1>Outputresultaten</h1>
            <p><OutputMeta /></p>
        </div>
        </div>
        <div className='table-container'>
            {data.map(item => (
                <OutputsGraph data={item}/>
            ))}
        </div>
    </div>
  )
}

export default OutputResultsDetail