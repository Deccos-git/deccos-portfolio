import { useState, useEffect } from 'react'
import OutputsGraph from '../outputs/OutputsGraph'
import { functionsDeccos } from "../../firebase/configDeccos";
import { httpsCallable } from "firebase/functions";
import Location from "../../helpers/Location";
import { useFirestoreGeneralFour } from "../../firebase/useFirestore";

const DashboardEffectResults = ({effectId}) => {
// State
const [data, setData] = useState([])

// Hooks
const portfolioId = Location()[3]

// Firestore
const syncs = useFirestoreGeneralFour(
 'synchronisations', 'portfolioId', 
 portfolioId ? portfolioId : '', 
 'syncItem', effectId ? effectId : '', 
 'status', 'accepted',
 'type', 'effect')

 // Get the project results for the syncs
 useEffect(() => {
    if (syncs) {
      const promises = syncs.map(sync => {
        return (async () => {
          const sendEffectData = httpsCallable(functionsDeccos, 'sendEffectData');
          const dataToSend = {
            effectId: sync.projectEffect
          };
          try {
            const result = await sendEffectData({ data: dataToSend });

            return result.data; // Return the data to be collected
          } catch (error) {
            console.error(error);
            return null; // Return null or appropriate error handling
          }
        })();
      });
  
      Promise.all(promises).then(results => {
       
        console.log(results)

      });
    }
  }, [syncs]);

  return (
    <div>DashboardEffectResults</div>
  )
}

export default DashboardEffectResults