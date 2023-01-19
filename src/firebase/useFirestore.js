import { db } from "../firebase/config"
import { db as deccosdb } from "./configDeccos";
import { useState, useEffect} from 'react';
import { collection, query, where, getDocs, orderBy, onSnapshot } from "firebase/firestore"; 
import { client } from "../helpers/Client";

const useFirestoreGeneral = (coll, field, id) => {
    const [docs, setDocs] = useState([])

    const col = collection(db, coll);
    const q = query(col, where(field, '==', id))

    useEffect(() => {

        const unsubscribe = onSnapshot(q, (querySnapshot) => {

            const docArray = [];

            querySnapshot.forEach((doc) => {
                docArray.push({...doc.data(), docid: doc.id});
            });  

            setDocs(docArray)
    
        })
        return () => unsubscribe()

    },[coll, field, id])

    return docs

}

const useFirestoreId = (coll, id) => {
    const [docs, setDocs] = useState([])

    const col = collection(db, coll);
    const q = query(col, where('compagny', '==', client), where("id", '==', id))

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

const useFirestoreCompagny = (coll) => {
    const [docs, setDocs] = useState([])

    const col = collection(db, coll);
    const q = query(col, where('id', '==', client))

    useEffect(() => {

        const unsubscribe = onSnapshot(q, (querySnapshot) => {

            const docArray = [];

            querySnapshot.forEach((doc) => {
                docArray.push({...doc.data(), docid: doc.id});
            });  

            setDocs(docArray)
    
        })
        return () => unsubscribe()

    },[coll])

    return docs

}

export { 
    useFirestoreGeneral,
    useFirestoreId,
    useFirestoreCompagny
}
