import { useState, useEffect } from 'react'
import OutputsGraph from '../outputs/OutputsGraph'
import { functionsDeccos } from "../../firebase/configDeccos";
import { httpsCallable } from "firebase/functions";
import Location from "../../helpers/Location";
import { useFirestoreGeneralFour } from "../../firebase/useFirestore";

const DashboardEffectResults = ({effectId}) => {
// State
const [data, setData] = useState([])
const [loading, setLoading] = useState(true)

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

      setLoading(true)

      console.log(syncs)

      const promises = syncs.map(sync => {
        return (async () => {
          const sendEffectData = httpsCallable(functionsDeccos, 'sendEffectData');
          const dataToSend = {
            effectId: sync.projectEffect,
          };
          try {
            const result = await sendEffectData({ data: dataToSend });

            setLoading(false)

            return result.data; // Return the data to be collected
          } catch (error) {
            console.error(error);
            return null; // Return null or appropriate error handling
          }
        })();
      });
  
      Promise.all(promises).then(results => {
        setData(results)

      });
    }
  }, [syncs]);

  return (
    <div>
      {loading && <div>Loading...</div>}
      <div>
        {data && data.map((effect, index) => (
          <div key={index}>
            {console.log(effect)}
            {/* <h3>{effect.projectName}</h3>
            <h4>{effect.title}</h4>
            <OutputsGraph indicators={effect.indicators} /> */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DashboardEffectResults