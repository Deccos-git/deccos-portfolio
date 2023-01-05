import { db } from "../firebase/config"
import { db as deccosdb } from "./configDeccos";
import { useState, useEffect} from 'react';
import { collection, query, where, getDocs, orderBy, onSnapshot } from "firebase/firestore"; 
import Location from "../helpers/Location"

const client = '188cf474-0cf6-7516-c64c-e1917492b80c'

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
    const q = query(col, where('compagny', '==', client))

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
    useFirestoreId,
    useFirestoreCompagny
}
