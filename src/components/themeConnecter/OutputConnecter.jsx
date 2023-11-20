import { useState } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import Modal from 'react-modal';
import CableOutlinedIcon from '@mui/icons-material/CableOutlined';
import { functionsDeccos } from "../../firebase/configDeccos";
import { v4 as uuid } from 'uuid';
import { useFirestoreGeneralTwo as useFirestoreGeneralTwoDeccos } from "../../firebase/useFirestoreDeccos"
import { useFirestoreGeneral as useFirestoreGeneralDeccos } from "../../firebase/useFirestoreDeccos"
import { httpsCallable } from "firebase/functions";
import ButtonClicked from '../../components/common/ButtonClicked';
import Location from "../../helpers/Location"
import ThemeOutputMeta from '../../components/themes/ThemeOutputMeta';

const OutputConnecter = ({
    themeOutput,
    selectedTheme,
    setOutputsToUpdate,
    outputsToUpdate
}) => {
    const [openAddActivityModal, setOpenAddActivityModal] = useState(false)
    const [openAddOutputModal, setOpenAddOutputModal] = useState(false)
    const [activityTitle, setActivityTitle] = useState('')
    const [outputTitle, setOutputTitle] = useState('')
    const [themeOutputTitle, setThemeOutputTitle] = useState('')
    const [selectedActivity, setSelectedActivity] = useState('')
    const [selectedOutput, setSelectedOutput] = useState('')

    const compagnyId = Location()[4]
    const portfolioId = Location()[3]
    Modal.setAppElement('#root');
    const modalStyles = {
        content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        },
    };

    const compagnyOutputs = useFirestoreGeneralTwoDeccos('Outputs', 'CompagnyID', compagnyId ? compagnyId : '', 'ActivityID', selectedActivity ? selectedActivity : '')
    const activities = useFirestoreGeneralDeccos('Activities', 'CompagnyID', compagnyId ? compagnyId : '')

    // Set the output title in state
  const outputTitleHandler = (e) => {
    setOutputTitle(e.target.value)
  }

  // Create a new output
  const addOutput = async (e) => {

    const outputId = uuid()

    const data = {
      CompagnyId: compagnyId,
      ActivityID: selectedActivity,
      Title: outputTitle ? outputTitle : themeOutputTitle,
      ID: outputId,
      ThemeOutputID: themeOutput.outputId,
      Position: compagnyOutputs.length + 1,
      Color: '#000000',
      ThemeId: selectedTheme,
      PortfolioId: portfolioId,
    }

    console.log(data)

    // Create a new output in the project database via a cloud function
    const createOutput = httpsCallable(functionsDeccos, 'createOutput');

    createOutput({ data: data })
      .then((result) => {
        if(result.data === 'success') {
          // Close the modal
          setOpenAddOutputModal(false)

          // Set the selected output in state
          setSelectedOutput(outputId)
        } else {
          alert(`Er is iets mis gegaan, neem contact op met Deccos`)
        }
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
        alert(`Er is iets mis gegaan, neem contact op met Deccos`)
      });

      ButtonClicked(e, 'Opslaan..')
}

// Select an existing activity
const activityHandler = async (e) => {

    const activityId = e.target.options[e.target.selectedIndex].value

    // If the user wants to add a new activity
    if(activityId === 'addActivity') {
      setSelectedActivity('')
      setOpenAddActivityModal(true)
    // If the user selects an existing activity
    } else {
      setSelectedActivity(activityId)
    }

  }

  // Add a new activity
  const addActivity = async (e) => {

    const activityId = uuid()

    // Set the selected activity id in state
    setSelectedActivity(activityId)

    const data = {
      CompagnyId: compagnyId,
      Title: activityTitle,
      Position: activities.length + 1,
      PortfolioId: portfolioId,
      ThemeId: selectedTheme,
      ThemeActivityId: selectedActivity,
      ID: activityId,
    }

    // Create a new activity in the project database via a cloud function
    const createActivity = httpsCallable(functionsDeccos, 'createActivity');

    createActivity({ data: data })
      .then((result) => {
        if(result.data === 'success') {

          // Close the modal
          setOpenAddActivityModal(false)
        } else {
          alert(`Er is iets mis gegaan, neem contact op met Deccos`)
        }
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
        alert(`Er is iets mis gegaan, neem contact op met Deccos`)
      });

      ButtonClicked(e, 'Opslaan..')

  }

  // Set the activity title in state
  const activityTitleHandler = (e) => {
    setActivityTitle(e.target.value)
  }

  // Select an existing output
  const outputHanlder = async (e) => {

    const outputId = e.target.options[e.target.selectedIndex].value
    const docid = e.target.options[e.target.selectedIndex].dataset.docid

    // If the user wants to add a new output
    if(outputId === 'addOutput') {
      setSelectedOutput('')
      setOpenAddOutputModal(true)
    } else {

        // If the user selects an existing output
        // Set the selected output in state
        setSelectedOutput(outputId)

        // Update the state array with the new output. 
        // If the output is already in the array, don't add it again. 
        // And if their already is an output with the same themeOutputId filter it out of the array
        const index = outputsToUpdate.findIndex(item => item.themeOutputId === themeOutput.outputId)

        // If the object exists, remove it
        if (index !== -1) {
            outputsToUpdate.splice(index, 1);
            // Update the state
            setOutputsToUpdate([...outputsToUpdate])
        }
        
        // Add the new output to the array
        setOutputsToUpdate([...outputsToUpdate, {themeOutputId: themeOutput.outputId, docid: docid, themeId: selectedTheme}])
      
    }
}

    return (
        <tr key={themeOutput.id}>
            <td>
            <ThemeOutputMeta id={themeOutput.outputId} setThemeOutputTitle={setThemeOutputTitle} />
            </td>
            <td>
            <div>
                <div>
                <p><b>1. Selecteer een activiteit</b></p>
                <select name="" id="" onChange={activityHandler} defaultValue={selectedActivity}>
                    <option value="">-- Selecteer activiteit --</option>
                    {activities && activities.map(activity => (
                    <option value={activity.ID}>{activity.Activity}</option>
                    ))}
                    <option value="addActivity">+ Voeg activiteit toe</option>
                </select>
                <div style={{display: selectedActivity === '' ? 'none' : 'block'}}>
                    <p><b>2. Selecteer een output</b> </p>
                    <select name="" id="" onChange={outputHanlder} defaultValue={selectedOutput}>
                    <option value="">-- Selecteer output --</option>
                    {compagnyOutputs && compagnyOutputs.map(companyOutput => (
                        <option value={companyOutput.ID} themeOutputID={themeOutput.id} data-docid={companyOutput.docid}>{companyOutput.Title}</option>
                    ))}
                        <option data-themeoutputid={themeOutput.outputId} data-themeoutputtitle={themeOutputTitle}  value="addOutput">+ Voeg output toe</option>
                    </select>
                </div>
                </div>
            </div>
            </td>
            <Modal
        isOpen={openAddActivityModal}
        onRequestClose={openAddActivityModal}
        style={modalStyles}
        contentLabel="Activiteit toevoegen"
        >
            <div id='modal-container'>
            <div id='modal-title-container'>
                <CableOutlinedIcon/>
                <h1>Voeg nieuwe activiteit toe</h1>
            </div>
            <input type="text" placeholder='Schrijf hier de titel van de activiteit' onChange={activityTitleHandler} />
            <div id='modal-button-container'>
                <button id='modal-cancel-button' onClick={() => setOpenAddActivityModal(false)}>Annuleren</button>
                <button onClick={addActivity}>Opslaan</button>
            </div>
            </div>
        </Modal>
        <Modal
        isOpen={openAddOutputModal}
        onRequestClose={openAddOutputModal}
        style={modalStyles}
        contentLabel="Output toevoegen"
        >
            <div id='modal-container'>
            <div id='modal-title-container'>
                <CableOutlinedIcon/>
                <h1>Voeg nieuwe output toe</h1>
            </div>
            <input type="text" placeholder='Schrijf hier de titel van de output' defaultValue={themeOutputTitle} onChange={outputTitleHandler} />
            <div id='modal-button-container'>
                <button id='modal-cancel-button' onClick={() => setOpenAddOutputModal(false)}>Annuleren</button>
                <button onClick={addOutput}>Opslaan</button>
            </div>
            </div>
        </Modal>
        </tr>
    )
}

export default OutputConnecter