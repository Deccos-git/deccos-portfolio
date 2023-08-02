import { createContext, useState, useEffect } from "react";
import { db } from '../firebase/config'
import { collection, query, where, getDocs} from "firebase/firestore"; 
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

export const Auth = createContext()

export const AuthProvider = (props) => {

    const [user, setUser] = useState("")
    const [email, setEmail] = useState('')

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const email = user.email;

            setEmail(email)

        } else {
        return
        }
    });

    useEffect(() => {

        const userQuery = async () => {

            const col = collection(db, 'users');
            const q = query(col, where('email', '==', email));
            const snapshot = await getDocs(q);

            snapshot.docs.forEach(doc => 
                setUser({...doc.data(), docid: doc.id})
            );

        }

        userQuery()
        
    },[email])

    return(
        <Auth.Provider value={[user]}>
            {props.children}
        </Auth.Provider>
    )
}