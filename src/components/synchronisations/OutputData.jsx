import { functionsDeccos } from "../../firebase/configDeccos";
import { httpsCallable } from "firebase/functions";
import { useFirestoreGeneralTwo } from "../../firebase/useFirestore";
import Location from "../../helpers/Location";
import { useEffect, useState } from "react";

const OutputData = () => {
    // State
    const [data, setData] = useState(null)

    // Hooks
    const portfolioId = Location()[3]

    // Firestore
    const syncs = useFirestoreGeneralTwo('synchronisations', 'portfolioId', portfolioId ? portfolioId : 'none', 'status', 'accepted')

    // Get outputdata from API
    const getOutputData = async (projectId, outputId) => {
      const sendOutputData = httpsCallable(functionsDeccos, 'sendOutputData');
      const dataToSend = {
        compagnyId: projectId,
        outputId: outputId
      };
    
      try {
        const result = await sendOutputData({ data: dataToSend });
        return result.data; // Return the data directly
      } catch (error) {
        console.error(error);
        return null; // Return null or an appropriate value in case of an error
      }
    };

    // Iterate over syncs and get outputdata
    useEffect(() => {
      if (syncs && syncs.length > 0) {
        const fetchData = async () => {
          const promises = syncs.map(sync => getOutputData(sync.compagnyId, sync.projectOutput));
          const results = await Promise.all(promises);
          const filteredResults = results.filter(result => result !== null); // Filter out any nulls from errors
          setData(filteredResults);
        };
    
        fetchData();
      }
    }, [syncs]);

  return (
    data && data 
  )
}

export default OutputData