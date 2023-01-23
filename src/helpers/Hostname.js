import { useFirestoreGeneral } from '../firebase/useFirestore'
import { useState, useEffect } from "react";

const Hostname = () => {
    const [host, setHost] = useState('')

    const hostname = window.location.hostname 

    const impactManagers = useFirestoreGeneral('impactManagers', 'url', hostname)

    useEffect(() => {

        impactManagers && impactManagers.forEach(item => {
            setHost(item)
        })

    },[impactManagers])

    return host

}

export default Hostname