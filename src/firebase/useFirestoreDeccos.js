import { db } from "./configDeccos";
import { useState, useEffect} from 'react';
import { collection, query, where, getDocs, orderBy, onSnapshot } from "firebase/firestore"; 

const useFirestoreGeneral = (coll, key, id) => {
    const [docs, setDocs] = useState([])

    const col = collection(db, coll);
    const q = query(col, where(key, '==', id))

    useEffect(() => {

        const unsubscribe = onSnapshot(q, (querySnapshot) => {

            const docArray = [];

            querySnapshot.forEach((doc) => {
                docArray.push({...doc.data(), docid: doc.id});
            });  

            setDocs(docArray)
    
        })
        return () => unsubscribe()

    },[coll, key, id])

    return docs

}

const useFirestoreCollection = (coll) => {
    const [docs, setDocs] = useState([])

    const col = collection(db, coll);

    useEffect(() => {

        const unsubscribe = onSnapshot(col, (querySnapshot) => {

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


const useFirestoreCompagnyID = (collect, id) => {
    const [docs, setDocs] = useState([])

    const col = collection(db, collect);
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

    },[collect, id])

    return docs

}

const useFirestoreParentID = (collect, parentid) => {
    const [docs, setDocs] = useState([])

    const col = collection(db, collect);
    const q = query(col, where('ParentID', '==', parentid))

    useEffect(() => {

        const unsubscribe = onSnapshot(q, (querySnapshot) => {

            const docArray = [];

            querySnapshot.forEach((doc) => {
                docArray.push({...doc.data(), docid: doc.id});
            });  

            setDocs(docArray)
    
        })
        return () => unsubscribe()

    },[collect, parentid])

    return docs

}

const useFirestoreMkbaTotal = ( id) => {
    const [docs, setDocs] = useState([])

    const col = collection(db, 'SROIs');
    const q = query(col, where('SROISet', '==', id), where('Type', '==', 'benefit'))

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
    useFirestoreGeneral,
    useFirestoreCollection,
    useFirestoreCompagnyID,
    useFirestoreParentID,
    useFirestoreMkbaTotal
}