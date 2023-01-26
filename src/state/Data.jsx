import { createContext, useState, useEffect } from "react";
import { db } from '../firebase/configDeccos'
import { collection, query, where, getDocs} from "firebase/firestore"; 
import Location from "../helpers/Location";

export const Data = createContext()

export const DataProvider = (props) => {

    const [organisations, setOrganisations] = useState([])
    const [outputs, setOutputs] = useState([])
    const [targetgroups, setTargetgroups] = useState([])
    const [mkbaSets, setMkbaSets] = useState([])
    const [goals, setGoals] = useState([])
    const [activities, setActivities] = useState([])
    const [effects, setEffects] = useState([])

    const client = Location()[3]

    useEffect(() => {

        const array = []

        const userQuery = async () => {

            const col = collection(db, 'CompagnyMeta');
            const q = query(col, where('Parent', 'array-contains', client));
            const snapshot = await getDocs(q);

            snapshot.docs.forEach(doc => 
                array.push({...doc.data(), docid: doc.id})
            );

            setOrganisations(array)

        }

        userQuery()

    },[client])

    // Outputs
    useEffect(() => {

        const array = []

        const userQuery = async (id) => {

            const col = collection(db, 'Outputs');
            const q = query(col, where('CompagnyID', '==', id));
            const snapshot = await getDocs(q);

            snapshot.docs.forEach(doc => 
                array.push({...doc.data(), docid: doc.id})
            );

            setOutputs(array)

        }

        organisations && organisations.forEach(item => {
            userQuery(item.CompagnyID)
        })

    },[organisations])

    // Targetgroups
    useEffect(() => {

        const array = []

        const userQuery = async (id) => {

            const col = collection(db, 'Targetgroups');
            const q = query(col, where('CompagnyID', '==', id));
            const snapshot = await getDocs(q);

            snapshot.docs.forEach(doc => 
                array.push({...doc.data(), docid: doc.id})
            );

            setTargetgroups(array)

        }

        organisations && organisations.forEach(item => {
            userQuery(item.CompagnyID)
        })

    },[organisations])


    // MKBA-sets
    useEffect(() => {

        const array = []

        const userQuery = async (id) => {

            const col = collection(db, 'SROISets');
            const q = query(col, where('CompagnyID', '==', id));
            const snapshot = await getDocs(q);

            snapshot.docs.forEach(doc => 
                array.push({...doc.data(), docid: doc.id})
            );

            setMkbaSets(array)

        }

        organisations && organisations.forEach(item => {
            userQuery(item.CompagnyID)
        })

    },[organisations])

    // Goals
    useEffect(() => {

        const array = []

        const userQuery = async (id) => {

            const col = collection(db, 'Goals');
            const q = query(col, where('CompagnyID', '==', id));
            const snapshot = await getDocs(q);

            snapshot.docs.forEach(doc => 
                array.push({...doc.data(), docid: doc.id})
            );

            setGoals(array)

        }

        organisations && organisations.forEach(item => {
            userQuery(item.CompagnyID)
        })

    },[organisations])

    // Activities
    useEffect(() => {

        const array = []

        const userQuery = async (id) => {

            const col = collection(db, 'Activities');
            const q = query(col, where('CompagnyID', '==', id));
            const snapshot = await getDocs(q);

            snapshot.docs.forEach(doc => 
                array.push({...doc.data(), docid: doc.id})
            );

            setActivities(array)

        }

        organisations && organisations.forEach(item => {
            userQuery(item.CompagnyID)
        })

    },[organisations])

    // Effects
    useEffect(() => {

        const array = []

        const userQuery = async (id) => {

            const col = collection(db, 'OutputEffects');
            const q = query(col, where('CompagnyID', '==', id));
            const snapshot = await getDocs(q);

            snapshot.docs.forEach(doc => 
                array.push({...doc.data(), docid: doc.id})
            );

            setEffects(array)

        }

        organisations && organisations.forEach(item => {
            userQuery(item.CompagnyID)
        })

    },[organisations])

    return(
        <Data.Provider value={[organisations, outputs, targetgroups, mkbaSets, goals, activities, effects]}>
            {props.children}
        </Data.Provider>
    )
}