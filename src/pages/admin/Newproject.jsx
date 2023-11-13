import { useState, useContext } from 'react';
import uuid from 'react-uuid';
import ButtonClicked from "../../components/common/ButtonClicked";
import { Auth } from '../../state/Auth';
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore"; 
import { dbDeccos as db, functionsDeccos } from '../../firebase/configDeccos'
import saveFile from '../../components/core/savefile';
import Location from "../../helpers/Location";
import { useEffect } from 'react';
import { httpsCallable } from "firebase/functions";

const Newproject = () => {
    const [user] = useContext(Auth)

    const [logo, setLogo] = useState('')
    const [projectName, setProjectName] = useState("")
    const [impactManager, setImpactManager] = useState('')
    const [projectUser, setProjectUser] = useState('')

    const navigate = useNavigate()
    const client = Location()[3]

    const getProjectsUser = async () => {

      const q = query(collection(db, "Users"), where("Email", "==", user.email));

      const querySnapshot = await getDocs(q);
        const array = []

        querySnapshot.docs.map(async (doc) => {
          const object = {
            id: doc.data().ID,
            userName: doc.data().UserName,
            email: doc.data().Email,
            photo: doc.data().Photo,
            docid: doc.id,
          }
          array.push(object)
        })

        setProjectUser(array[0])
    }

    useEffect(() => {

      getProjectsUser()

    }, [user])

    const logoHandler = (e) => {
        saveFile(e, setLogo)
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

      const id = uuid()

      const createProjectAccount = httpsCallable(functionsDeccos, 'createProjectAccount');

      const data = {
        compagny: projectName,
        logo: logo,
        trialType: 'compleet',
        ImpactManager: impactManager,
        Parent: client,
        Subscription: 'paid',
        CompagnyId: id,
        Auth: projectUser
      }


      createProjectAccount({ data: data })
        .then((result) => {
          // Handle the result of the Cloud Function
          console.log(result.data);
          navigate(`/dashboard/organisation/${client}/${id}`)
        })
        .catch((error) => {
          // Handle errors
          console.error(error);
          alert(`Er is iets mis gegaan, neem contact op met Deccos`)
        });

        ButtonClicked(e, 'Opslaan..')

    }

  return (
    <div className='page-container'>
        <div className='page-top-container'>
            <h1>Nieuw project toevoegen</h1>
        </div>
        <div >
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
        </div>
    </div>
  )
}

export default Newproject