import { useState, useEffect } from 'react'
import OutputsGraph from '../outputs/OutputsGraph'
import { functionsDeccos } from "../../firebase/configDeccos";
import { httpsCallable } from "firebase/functions";
import Location from "../../helpers/Location";
import { useFirestoreGeneralFour } from "../../firebase/useFirestore";

const DashboardOutputResults = ({outputId}) => {
    // State
    const [data, setData] = useState([])

     // Hooks
     const portfolioId = Location()[3]

    // Firestore
    const syncs = useFirestoreGeneralFour(
      'synchronisations', 'portfolioId', 
      portfolioId ? portfolioId : 'none', 
      'syncItem', outputId ? outputId : 'none', 
      'status', 'accepted',
      'type', 'output')

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

    // Collect all unique IDs form the data object
  const uniqueIds = data.length > 0 && data.reduce((acc, item) => {
    Object.keys(item).forEach(key => {
      if (key !== 'Maand' && key !== 'Total' && !acc.includes(key)) {
        acc.push(key);
      }
    });
    return acc;
  }, []);

  return (
    <OutputsGraph data={data} uniqueIds={uniqueIds}/>
  )
}

export default DashboardOutputResults