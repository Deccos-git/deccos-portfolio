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
  // Context
    const [user] = useContext(Auth)

    // State
    const [logo, setLogo] = useState('')
    const [projectName, setProjectName] = useState("")
    const [impactManager, setImpactManager] = useState('')

    // Hooks
    const navigate = useNavigate()
    const client = Location()[3]


    // Get the logo
    const logoHandler = (e) => {
        saveFile(e.target.files, setLogo)
    }

    // Get the project name
    const projectNameHandler = (e) => {
        const name = e.target.value 
        setProjectName(name)

    }

    // Get the impact manager
    const impactManagerHandler = (e) => {
        const value = e.target.options[e.target.selectedIndex].value 

        setImpactManager(value)
    }

    // Helper function to save user as team member
    const saveUserAsTeamMember = async (id) => {

      const createProjectAccount = httpsCallable(functionsDeccos, 'saveUserAsTeamMember');

      const data = {
        email: user.email,
        compagnyId: id
      }

      createProjectAccount({ data: data })
        .then((result) => {
          console.log(result)
        })
        .catch((error) => {
          // Handle errors
          console.error(error);
          alert(`Er is iets mis gegaan, neem contact op met Deccos`)
        });

    }

    // Save the project
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
        Auth: user.id
      }


      createProjectAccount({ data: data })
        .then((result) => {
          // Save user as team member
          saveUserAsTeamMember(id)
        })
        .then(() => {
          navigate(`/portfolio/organisation/${client}/${id}`)
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