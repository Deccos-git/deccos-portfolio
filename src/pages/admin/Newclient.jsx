import { useState } from 'react';
import { db } from "../../firebase/config";
import { dbDeccos } from '../../firebase/configDeccos';
import uuid from 'react-uuid';
import saveFile from '../../components/core/savefile';
import { useNavigate } from "react-router-dom";
import { doc, setDoc, updateDoc, serverTimestamp, arrayUnion } from "firebase/firestore"; 

const NewClient = () => {
    const [name, setName] = useState("")
    const [banner, setBanner] = useState('')

    const navigate = useNavigate();
    const id = uuid()

    const nameHandler = (e) => {
        const name = e.target.value 
        setName(name)
    }

    const logoHandler = (e) => {

        saveFile(e.target.files, setBanner)
    }


    // Don't forget to change the firestore rules if you change anything in createClient
    const createClient = async (e) => {

        e.preventDefault()
 
        await setDoc(doc(db, "compagnies", uuid()), {
            compagny: name,
            logo: banner,
            id: id,
            timestamp: serverTimestamp(),
        })

        await setDoc(doc(db, "settings", uuid()), {
            companyId: id,
            id: uuid(),
            compagnyProject: 'project',
            primaryColor: '#f48183',
            secondaryColor: '#216d7f',
            tertiaryColor: '#47acc3',
        })

        await setDoc(doc(db, "goals", uuid()), {
            companyId: id,
            id: uuid(),
            title: ''
        })

        await setDoc(doc(db, "societalProblem", uuid()), {
            companyId: id,
            id: uuid(),
            title: ''
        })

        await setDoc(doc(db, "admins", uuid()), {
            companyID: id,
            id: uuid(),
            email: 'info@deccos.nl',
            photo: 'https://firebasestorage.googleapis.com/v0/b/deccos-app.appspot.com/o/ProfilePhotos%2Ffoto-gijs350.jpg?alt=media&token=0e8e886f-2384-4f4c-b5de-a14fa7376135',
            userId: '6a8bf-08c3-a1ad-d04d-231ebe51dc60',
            name: 'Gijs van Beusekom'
        })

        await updateDoc(doc(dbDeccos, "Users", 'RdnXtfMWx2TwvjggSb34JWVgpkG3'),{     
            Finpact: arrayUnion(id)
        })
                   
        navigate(`/dashboard/home/${id}`)
                   
    }


    return (
        <div>
            <div className='page-container'>
                <div className="card-header">
                    <h1 id='title-new-client'>Creëer een Deccos bedrijfsaccount</h1>
                </div>
                <form >
                    <p>Bedrijfsnaam*</p>
                    <input onChange={nameHandler} type="text" placeholder="Schrijf hier de bedrijfsnaam" />
                    <p>Logo</p>
                    <div id='new-client-logo-container'>
                        <img src={banner} alt="" />
                    </div>
                    <input className="input-classic" type="file" onChange={logoHandler} />
                    <div className="button-container-margin-top new-client-button-container">
                        <button onClick={createClient}>Aanmaken</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewClient