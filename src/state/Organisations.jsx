import { createContext, useState, useEffect } from "react";
import { db } from '../firebase/configDeccos'
import { collection, query, where, getDocs} from "firebase/firestore"; 
import { client } from "../helpers/Client";

export const Orgs = createContext()

export const OrganisationsProvider = (props) => {

    const [organisations, setOrganisations] = useState("")
    const [financiers, setFinanciers] = useState([])

    useEffect(() => {

        const userQuery = async () => {

            const col = collection(db, 'Financiers');
            const q = query(col, where('FinancierID', '==', client));
            const snapshot = await getDocs(q);

            const docArray = []

            snapshot.docs.forEach(doc => 
                docArray.push({...doc.data(), docid: doc.id})
            );

            setFinanciers(docArray)

        }

        userQuery()
        
    },[client])

    useEffect(() => {

        const compagnyArray = []

        const userQuery = async (id) => {

            const col = collection(db, 'CompagnyMeta');
            const q = query(col, where('CompagnyID', '==', id));
            const snapshot = await getDocs(q);

            snapshot.docs.forEach(doc => 
                compagnyArray.push({...doc.data(), docid: doc.id})
            );

            setOrganisations(compagnyArray)

        }

        financiers && financiers.forEach(item => {
            userQuery(item.CompagnyID)
        })

    },[financiers])

    return(
        <Orgs.Provider value={[organisations]}>
            {props.children}
        </Orgs.Provider>
    )
}