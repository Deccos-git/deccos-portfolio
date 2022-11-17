import { db } from "../firebase/config"
import { db as deccosdb } from "./configDeccos";
import { useState, useEffect} from 'react';
import { collection, query, where, getDocs, orderBy, onSnapshot } from "firebase/firestore"; 

const useFirestoreId = (coll, id) => {
    const [docs, setDocs] = useState([])

    const col = collection(db, coll);
    const q = query(col, where("id", '==', id))

    useEffect(() => {

        const unsubscribe = onSnapshot(q, (querySnapshot) => {

            const docArray = [];

            querySnapshot.forEach((doc) => {
                docArray.push({...doc.data(), docid: doc.id});
            });  

            setDocs(docArray)
    
        })
        return () => unsubscribe()

    },[coll, id])

    return docs

}

export { 
    useFirestoreId
}
