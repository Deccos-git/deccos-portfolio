import { db } from "../firebase/config"
import { db as deccosdb } from "./configDeccos";
import { useState, useEffect} from 'react';
import { collection, query, where, getDocs, orderBy, onSnapshot } from "firebase/firestore"; 
import Location from "../helpers/Location";

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

const useFirestoreArrayContains = (coll, field, id) => {
    const [docs, setDocs] = useState([])

    const col = collection(db, coll);
    const q = query(col, where(field, 'array-contains', id))

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

    const client = Location()[3]

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

    const client = Location()[3]

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

const useFirestoreImpactManager = (id) => {
    const [docs, setDocs] = useState([])

    const client = Location()[3]

    const col = collection(db, 'compagnies');
    const q = query(col, where('id', '==', client), where('impactManager', 'array-contains', id))

    useEffect(() => {

        const unsubscribe = onSnapshot(q, (querySnapshot) => {

            const docArray = [];

            querySnapshot.forEach((doc) => {
                docArray.push({...doc.data(), docid: doc.id});
            });  

            setDocs(docArray)
    
        })
        return () => unsubscribe()

    },[client, id])

    return docs

}

export { 
    useFirestoreGeneral,
    useFirestoreArrayContains,
    useFirestoreId,
    useFirestoreCompagny,
    useFirestoreImpactManager
}
