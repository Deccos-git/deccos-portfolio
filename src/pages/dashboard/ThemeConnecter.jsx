import React, { useEffect } from 'react'
import Location from "../../helpers/Location"
import { useFirestoreGeneralTwo as useFirestoreGeneralTwoDeccos } from "../../firebase/useFirestoreDeccos"
import { useFirestoreGeneral as useFirestoreGeneralDeccos } from "../../firebase/useFirestoreDeccos"
import { useFirestoreGeneral } from "../../firebase/useFirestore"
import Tooltip from '../../components/common/Tooltip'
import CableOutlinedIcon from '@mui/icons-material/CableOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ThemeMeta from '../../components/themes/ThemeMeta';
import { doc, deleteDoc, serverTimestamp, setDoc } from "firebase/firestore"; 
import { db  } from "../../firebase/config"
import { dbDeccos, functionsDeccos } from "../../firebase/configDeccos"
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useState } from 'react';
import Modal from 'react-modal';
import OutputMeta from '../../components/outputs/OutputMeta';
import { v4 as uuid } from 'uuid';
import { httpsCallable } from "firebase/functions";
import ButtonClicked from '../../components/common/ButtonClicked';

const ThemeConnecter = () => {

  const [compagnyName, setCompagnyName] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState('')
  const [selectedActivity, setSelectedActivity] = useState('')
  const [selectedOutput, setSelectedOutput] = useState('')
  const [selectedOutputDocid, setSelectedOutputDocid] = useState('')

  const compagnyId = Location()[4]
  const portofioId = Location()[3]
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

  const compagnies = useFirestoreGeneralDeccos('CompagnyMeta', 'CompagnyID', compagnyId ? compagnyId : '')
  const themes = useFirestoreGeneral('themes', 'compagny', portofioId ? portofioId : '')
  const themesCompagnyPairs = useFirestoreGeneral('themeCompagnyPairs', 'compagnyId', compagnyId ? compagnyId : '')
  const themeOutputs = useFirestoreGeneral('themeOutputs', 'themeId', selectedTheme ? selectedTheme : '')
  const compagnyOutputs = useFirestoreGeneralTwoDeccos('Outputs', 'CompagnyID', compagnyId ? compagnyId : '', 'ActivityID', selectedActivity ? selectedActivity : '')
  const activities = useFirestoreGeneralDeccos('Activities', 'CompagnyID', compagnyId ? compagnyId : '')

  // Set the compagny name in state
  useEffect(() => {
    compagnies && compagnies.map(item => (
      setCompagnyName(item.CommunityName)
    ))
  }, [compagnies])

  // Add a theme
  const addTheme = async () => {

  }

  // Delete theme
  const deleteTheme = async (e) => {

    const docid = e.target.dataset.docid

    await deleteDoc(doc(db, "themeCompagnyPairs", docid))

  }

  // Set the selected theme in state
  const themeHandler = (e) => {
    setSelectedTheme(e.target.options[e.target.selectedIndex].value)
  }

  // Create a new output
  const createOutputHandler = async (e) => {

    const outputId = e.target.dataset.outputid

    const data = {
      CompagnyId: compagnyId,
      ActivityID: selectedActivity,
      Title: outputId,
      Position: compagnyOutputs.length + 1,
      Color: '#000000',
      ThemeId: selectedTheme,
      PortfolioId: portofioId,
    }

    const createOutput = httpsCallable(functionsDeccos, 'createOutput');

    createOutput({ data: data })
      .then((result) => {
        if(result.data === 'success') {
          alert(`Output is gecreeerd`)
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

    setSelectedActivity(activityId)

  }

  // Select an existing output
  const existingOutputHanlder = async (e) => {

    setSelectedOutput(e.target.options[e.target.selectedIndex].value)
    setSelectedOutputDocid(e.target.options[e.target.selectedIndex].dataset.docid)

  }

  const updateExistingOutput = async (e) => {

    const data = {
      themeId: selectedTheme,
      portfolioId: portofioId,
      docid: selectedOutputDocid,
    }

    const updateOutput = httpsCallable(functionsDeccos, 'updateOutput');

    updateOutput({ data: data })
      .then((result) => {
        if(result.data === 'success') {
          alert(`Output is gekoppeld`)
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

  return (
    <div className='page-container'>
      <div className='page-top-container'>
        <div className='page-header-title-container'>
          <CableOutlinedIcon/>
          <h1>Thema's van {compagnyName}</h1>
        </div>
      </div>
      <div className='table-container'>
        <div className="add-icon-container">
            <Tooltip content='Thema koppelen' width='80%' left='30px' top='-5px'>
                <AddCircleOutlineOutlinedIcon className="add-icon" onClick={() => setOpenModal(true)} />
            </Tooltip>
        </div>
        <table>
          <tr>
              <th>THEMA</th>
              <th>OUTPUTS</th>
              <th>VERWIJDEREN</th>
          </tr>
          {themesCompagnyPairs && themesCompagnyPairs.map(item => (
              <tr key={item.id} >
                <td>
                    <ThemeMeta item={item} />
                </td>
                <td>
                
                </td>
                <td>
                  <Tooltip content='Thema verwijderen' width='80%' left='30px' top='-5px'>
                      <DeleteOutlineOutlinedIcon className="delete-icon" data-docid={item.docid} onClick={deleteTheme} />
                  </Tooltip>
                </td>
            </tr>
          ))} 
        </table>
      </div>
      <Modal
      isOpen={openModal}
      onRequestClose={openModal}
      style={modalStyles}
      contentLabel="Theme koppelen"
      >
        <div id='modal-container'>
          <div id='modal-title-container'>
            <CableOutlinedIcon/>
            <h1>Koppel thema</h1>
          </div>
         <div>
          <p><b>Selecteer thema</b></p>
          <select name="" id="" onChange={themeHandler}>
            <option value="">-- Selecteer thema --</option>
            {themes && themes.map(item => (
              <option value={item.id}>{item.title}</option>
            ))}
          </select>
          <div style={{display: selectedTheme === '' ? 'none' : 'block'}}>
            <p><b>Koppel outputs</b></p>
            <table>
            <tr>
                <th>THEME OUTPUT</th>
                <th>ORGANISATIE OUTPUT</th>
            </tr>
            {themeOutputs && themeOutputs.map(item => (
                <tr key={item.id}>
                  <td>
                    <OutputMeta output={item.outputId} />
                  </td>
                  <td>
                    <div>
                      <div>
                        <p><b>1. Selecteer een activiteit</b></p>
                        <select name="" id="" onChange={activityHandler}>
                          <option value="">-- Selecteer activiteit --</option>
                          {activities && activities.map(item => (
                            <option value={item.ID}>{item.Activity}</option>
                          ))}
                        </select>
                        <div style={{display: selectedActivity === '' ? 'none' : 'block'}}>
                          <p><u>2. Selecteer een output</u> </p>
                          <select name="" id="" onChange={existingOutputHanlder}>
                            <option value="">-- Selecteer output --</option>
                            {compagnyOutputs && compagnyOutputs.map(item => (
                              <option value={item.ID} data-docid={item.docid}>{item.Title}</option>
                            ))}
                          </select>
                          <button style={{display: selectedOutput === '' ? 'none' : 'block'}} onClick={updateExistingOutput}>Selecteer</button>
                          <div>
                            <p><u>Of creëer nieuwe output</u></p>
                            <OutputMeta output={item.outputId} />
                            <button data-outputId={item.outputId} onClick={createOutputHandler}>Creëer</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </table>
          </div>
          <div id='modal-button-container'>
            <button id='modal-cancel-button' onClick={() => setOpenModal(false)}>Annuleren</button>
            <button onClick={addTheme}>Opslaan</button>
          </div>

         </div>
        </div>
    </Modal>
  </div>
  )
}

export default ThemeConnecter