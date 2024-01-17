import { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { dbDeccos } from "../../firebase/configDeccos";


// The results for the selected themeOutput is fetched from the Decos database
// The first step is to get all dates for the selected themeOutput (getAllDates)
// Then, for each date, all results are fetched (fetchData)
// The results are added to the previous result (addResults)
// The results are returned as an array of objects


const ThemeOutputResults = (themeOutputId, themeId) => {
    const [data, setData] = useState(null);
    const [total, setTotal] = useState(null);

    const getAllDates = async () => {

        // Get all outputs for this theme
        const colOutputs = collection(dbDeccos, 'Outputs');
        const qOutputs = query(colOutputs, where('ThemeID', '==', themeId));
        const outputsSnapshot = await getDocs(qOutputs);

        const datesArray = [];

        // For each output, get all dates
        for (let doc of outputsSnapshot.docs) {

            // Get the id of the output
            const outputId = doc.data().ID;

            // Query all dates for the outputs
            const colResults = collection(dbDeccos, 'Results');
            const qResults = query(colResults, where('OutputID', '==', outputId), orderBy('Timestamp', 'asc'));
            const resultsSnapshot = await getDocs(qResults);

            for (let doc of resultsSnapshot.docs) {
                const date = doc.data().Timestamp.toDate().toLocaleDateString("nl-NL", {day: 'numeric', month: 'numeric', year: 'numeric'});
                datesArray.push(date);
            }
        }

        // Get unique dates
        const uniqueDates = [...new Set(datesArray)];

        // Sort the dates
        uniqueDates.sort((a, b) => {
            return new Date(a) - new Date(b);
        });

        return uniqueDates;

    }

    const compagnyName = async (compagnyId) => {

        let name = ''

        // Query the compagny name from the Decos database
        const col = collection(dbDeccos, 'CompagnyMeta');
        const q = query(col, where('CompagnyID', '==', compagnyId));
        const snapshot = await getDocs(q);

        for (let doc of snapshot.docs) {
            name = doc.data().CommunityName;
        }

        return name

    }

    const fetchData = async () => {

        const dates = await getAllDates();

        const array = [];

        // For each date, get all results
        await Promise.all(dates.map( async date => {

            const object = {
                name: date,
            }

            // Get the selected themeOutput
            const colOutputs = collection(dbDeccos, 'Outputs');
            const qOutputs = query(colOutputs, where('ThemeID', '==', themeId), where('ThemeOutputId', '==', themeOutputId));
            const outputsSnapshot = await getDocs(qOutputs);

            // For the selected output, get all results
            for (let doc of outputsSnapshot.docs) {

                // Get the id of the output
                const outputId = doc.data().ID;
                const companyName = await compagnyName(doc.data().CompagnyID);

                // Query all results for the outputs
                const colResults = collection(dbDeccos, 'Results');
                const qResults = query(colResults, where('OutputID', '==', outputId), orderBy('Timestamp', 'asc'));
                const resultsSnapshot = await getDocs(qResults);

                // If there are no results, add the company name as key and 0 as value
                resultsSnapshot.empty ? object[companyName] = 0 : object[companyName] = 0;

                // For each result, add to the date and the result to the array
                resultsSnapshot.forEach( async doc => {
                   const timestamp = doc.data().Timestamp.toDate().toLocaleDateString("nl-NL", {day: 'numeric', month: 'numeric', year: 'numeric'});

                     if(timestamp === date) {
                        // Add the compagnyName as key and the result as value
                        object[companyName] = doc.data().Result;
                     }

                });

            }

            array.push(object);

        }));

        addResults(array);

        setData(array);
    };

    const addResults = (array) => {

        // Add the results to the previous result
        for (let i = 1; i < array.length; i++) {
        for (const key in array[i]) {
            if (typeof array[i][key] === 'number') {
            array[i][key] += array[i - 1][key];
            }
        }
        }
    }

    useEffect(() => {
        getAllDates();
        fetchData();
    }, [themeOutputId, themeId]); 

    return data;
};

export default ThemeOutputResults;