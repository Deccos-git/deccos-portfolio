import { useState, useContext } from 'react';
import uuid from 'react-uuid';
import ButtonClicked from "../../components/common/ButtonClicked";
import { Auth } from '../../state/Auth';
import { useNavigate } from "react-router-dom";
import { doc, setDoc, serverTimestamp, arrayUnion, updateDoc } from "firebase/firestore"; 
import { db } from '../../firebase/configDeccos'
import saveFile from '../../components/core/savefile';
import { client } from "../../helpers/Client"

const Newproject = () => {
    const [user] = useContext(Auth)

    const [logo, setLogo] = useState('')
    const [projectName, setProjectName] = useState("")
    const [impactManager, setImpactManager] = useState('')

    const navigate = useNavigate()

    const logoHandler = (e) => {
        saveFile(e.target.files, setLogo)
    }

    const projectNameHandler = (e) => {
        const name = e.target.value 
        setProjectName(name)

    }

    const impactManagerHandler = (e) => {
        const value = e.target.options[e.target.selectedIndex].value 

        setImpactManager(value)
    }

    const saveProject = async (e) => {

        e.preventDefault()

        ButtonClicked(e, 'Opgeslagen')

        const id = uuid()
        const centralProblemID = uuid()

        await setDoc(doc(db, "CompagnyMeta", uuid()), {
            Compagny: projectName,
            ImpactManager: impactManager,
            Parent: arrayUnion(client),
            Logo: logo,
            CompagnyID: id,
            Premium: true,
            Timestamp: serverTimestamp(),
            Impacthub: false,
            ImpactBanner: 'https://firebasestorage.googleapis.com/v0/b/deccos-app.appspot.com/o/ImpactHeaderDefault.png?alt=media&token=5d11c139-431d-4c66-84d1-23878e3ad460'
          })

          await setDoc(doc(db, "Admins", uuid()), {
            Compagny: projectName.toLocaleLowerCase(),
            CompagnyID: id,
            Email: user.Email,
            Photo: user.Photo,
            UserID: user.ID,
            UserName: user.UserName,
            Timestamp: serverTimestamp()
          })

          await setDoc(doc(db, "Admins", uuid()), {
            Compagny: projectName.toLocaleLowerCase(),
            CompagnyID: id,
            Email: 'info@deccos.nl',
            Photo: 'https://firebasestorage.googleapis.com/v0/b/deccos-app.appspot.com/o/ProfilePhotos%2Ffoto-gijs350.jpg?alt=media&token=0e8e886f-2384-4f4c-b5de-a14fa7376135',
            UserID: '6a8bf-08c3-a1ad-d04d-231ebe51dc60',
            UserName: `Gijs van Beusekom`,
            Timestamp: serverTimestamp()
          })

          await setDoc(doc(db, "Stakeholders", uuid()), {
            ID: uuid(),
            Compagny: projectName.toLocaleLowerCase(),
            Name: '',
            CompagnyID: id,
            Timestamp: serverTimestamp()
          })

          await setDoc(doc(db, "Groups", uuid()), {
            ID: uuid(),
            Compagny: projectName.toLocaleLowerCase(),
            MemberList: arrayUnion(id),
            Room: 'Impact HQ',
            CompagnyID: id,
            Timestamp: serverTimestamp()
          })

          await setDoc(doc(db, "CentralProblem", uuid()), {
            ID: centralProblemID,
            CentralProblem: '',
            CompagnyID: id,
            Timestamp: serverTimestamp()
          })

          await setDoc(doc(db, "DirectCauses", uuid()), {
            CentralProblemID: centralProblemID,
            CompagnyID: id,
            Timestamp: serverTimestamp(),
            DirectCause: '',
            ID: uuid()
          })

          await setDoc(doc(db, "IndirectCauses", uuid()), {
            CentralProblemID: centralProblemID,
            CompagnyID: id,
            Timestamp: serverTimestamp(),
            IndirectCause: '',
            ID: uuid()
          })

          await setDoc(doc(db, "DirectConsequences", uuid()), {
            CentralProblemID: centralProblemID,
            CompagnyID: id,
            Timestamp: serverTimestamp(),
            DirectConsequences: '',
            ID: uuid()
          })

          await setDoc(doc(db, "IndirectConsequences", uuid()), {
            CentralProblemID: centralProblemID,
            CompagnyID: id,
            Timestamp: serverTimestamp(),
            IndirectConsequences: '',
            ID: uuid()
          })

          await updateDoc(doc(db, "Users", user.docid), {
            Compagny: arrayUnion(id)
          })

          await updateDoc(doc(db, "Users", 'RdnXtfMWx2TwvjggSb34JWVgpkG3'), {
            Compagny: arrayUnion(id)
          })

         

          navigate(`/dashboard/organisation/${client}/${id}`)

    }

  return (
    <div className='page-container'>
        <div className='page-top-container'>
            <h1>Nieuw project toevoegen</h1>
        </div>
        <form >
            <p>Bedrijfsnaam*</p>
            <input onChange={projectNameHandler} type="text" placeholder="Schrijf hier de bedrijfsnaam" />
            <p>Logo</p>
            <div id='new-client-logo-container'>
                <img src={logo} alt="" />
            </div>
            <input className="input-classic" type="file" onChange={logoHandler} />
            <p>Impact manager</p>
                <select name="" id="" onChange={impactManagerHandler}>
                    <option value="">-- Selecteer een impactmanager</option>
                    <option value="Alexander Impact">Alexander Impact</option>
                    <option value="Deccos">Deccos</option>
                </select>
            <div className="button-container-margin-top new-client-button-container">
                <button onClick={saveProject}>Aanmaken</button>
            </div>
        </form>
    </div>
  )
}

export default Newproject