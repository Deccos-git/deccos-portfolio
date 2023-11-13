import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { dbDeccos } from "../../firebase/configDeccos";

const ThemeOutputResults = (themeId) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            // Get all outputs for this theme
            const colOutputs = collection(dbDeccos, 'Outputs');
            const qOutputs = query(colOutputs, where('ThemeID', '==', themeId));
            const outputsSnapshot = await getDocs(qOutputs);

            const allResults = [];

            // For each output, get all results
            for (let doc of outputsSnapshot.docs) {
                const outputId = doc.data().ID;
                const colResults = collection(dbDeccos, 'Results');
                const qResults = query(colResults, where('OutputID', '==', outputId));
                const resultsSnapshot = await getDocs(qResults);

                const resultsForOutput = [];

                // For each result, add to array
                resultsSnapshot.forEach(doc => {
                    const object = {
                        name: doc.data().Timestamp.toDate().toLocaleDateString("nl-NL", { month: 'numeric', year: 'numeric'}),
                        pv: doc.data().Result
                    }
                    resultsForOutput.push(object);
                });

                console.log(resultsForOutput);

                allResults.push(resultsForOutput);
            }

            console.log(allResults);

            setData(allResults);
        };

        fetchData();
    }, [themeId]); 

    console.log(data);

    // {
    //     name: 'Page A',
    //     uv: 4000,
    //     pv: 2400,
    //     amt: 2400,
    //   },
    //   {
    //     name: 'Page B',
    //     uv: 3000,
    //     pv: 1398,
    //     amt: 2210,
    //   },

    return data;
};

export default ThemeOutputResults;