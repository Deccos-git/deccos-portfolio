import { createContext, useState, useEffect } from "react";
import { db } from '../firebase/config'
import { collection, query, where, getDocs} from "firebase/firestore"; 
import Location from "../helpers/Location";

export const Settings = createContext()

export const SettingsProvider = (props) => {

    const [settings, setSettings] = useState('')

    const client = Location()[3]
    console.log(client)

    useEffect(() => {

        const array = []

        const userQuery = async () => {

            const col = collection(db, 'settings');
            const q = query(col, where('compagnyId', '==', client ? client : ''));
            const snapshot = await getDocs(q);

            snapshot.docs.forEach(doc => 
                array.push({...doc.data(), docid: doc.id})
            );

            setSettings(array)

        }

        userQuery()

    },[])

console.log(settings)
    return(
        <Settings.Provider value={[settings]}>
            {props.children}
        </Settings.Provider>
    )
}