import { createContext, useState, useEffect } from "react";
import { db } from '../firebase/configDeccos'
import { collection, query, where, getDocs} from "firebase/firestore"; 
import Location from "../helpers/Location";

export const Data = createContext()

export const DataProvider = (props) => {

    const [organisations, setOrganisations] = useState([])
    const [effects, setEffects] = useState([])
    const [outputs, setOutputs] = useState([])
    const [targetgroups, setTargetgroups] = useState([])

    const client = Location()[3]

    useEffect(() => {

        const array = []

        const userQuery = async () => {

            const col = collection(db, 'CompagnyMeta');
            const q = query(col, where('Parent', 'array-contains', client ? client : ''));
            const snapshot = await getDocs(q);

            snapshot.docs.forEach(doc => 
                array.push({...doc.data(), docid: doc.id})
            );

            setOrganisations(array)

        }

        userQuery()

    },[client])

    // KPI's
    useEffect(() => {

        const array = []

        const userQuery = async (id) => {

            const col = collection(db, 'OutputEffects');
            const q = query(col, where('CompagnyID', '==', id), where('KPI', '==', 'true'));
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

            const col = collection(db, 'Stakeholders');
            const q = query(col, where('CompagnyID', '==', id), where('Categorie', '==', 'Doelgroep'));
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

    return(
        <Data.Provider value={[organisations, effects, outputs, targetgroups]}>
            {props.children}
        </Data.Provider>
    )
}
