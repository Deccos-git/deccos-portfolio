import { createContext, useState, useEffect } from "react";
import { db } from '../firebase/config'
import { collection, query, where, getDocs} from "firebase/firestore"; 
import Location from "../helpers/Location";

export const PortfolioMeta = createContext()

export const PortfolioMetaProvider = (props) => {

    const [data, setData] = useState('')

    const client = Location()[3]

    useEffect(() => {

        const array = []

        const userQuery = async () => {

            const col = collection(db, 'compagnies');
            const q = query(col, where('id', '==', client ? client : ''));
            const snapshot = await getDocs(q);

            snapshot.docs.forEach(doc => 
                array.push({...doc.data(), docid: doc.id})
            );

            setData(array)

        }

        userQuery()

    },[client])

    return(
        <PortfolioMeta.Provider value={[data]}>
            {props.children}
        </PortfolioMeta.Provider>
    )
}