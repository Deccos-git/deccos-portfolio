import { db } from "./configDeccos";
import { useState, useEffect} from 'react';
import { collection, query, where, getDocs, orderBy, onSnapshot } from "firebase/firestore"; 

const useFirestoreOrganisations = (id) => {
    const [docs, setDocs] = useState([])

    const col = collection(db, 'CompagnyMeta');
    const q = query(col, where("Investors", 'array-contains', id))

    useEffect(() => {

        const unsubscribe = onSnapshot(q, (querySnapshot) => {

            const docArray = [];

            querySnapshot.forEach((doc) => {
                docArray.push({...doc.data(), docid: doc.id});
            });  

            setDocs(docArray)
    
        })
        return () => unsubscribe()

    },[id])

    return docs

}

const useFirestoreMilstones = (id) => {
    const [docs, setDocs] = useState([])

    const col = collection(db, 'Milestones');
    const q = query(col, where("CompagnyID", '==', id), where('Succes', '==', true))

    useEffect(() => {

        const unsubscribe = onSnapshot(q, (querySnapshot) => {

            const docArray = [];

            querySnapshot.forEach((doc) => {
                docArray.push({...doc.data(), docid: doc.id});
            });  

            setDocs(docArray)
    
        })
        return () => unsubscribe()

    },[id])

    return docs

}

const useFirestoreCompagny = (id) => {
    const [docs, setDocs] = useState([])

    const col = collection(db, 'CompagnyMeta');
    const q = query(col, where("CompagnyID", '==', id))

    useEffect(() => {

        const unsubscribe = onSnapshot(q, (querySnapshot) => {

            const docArray = [];

            querySnapshot.forEach((doc) => {
                docArray.push({...doc.data(), docid: doc.id});
            });  

            setDocs(docArray)
    
        })
        return () => unsubscribe()

    },[id])

    return docs

}

export { 
    useFirestoreOrganisations,
    useFirestoreMilstones,
    useFirestoreCompagny
}