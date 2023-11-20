import { useEffect } from 'react'
import Location from "../../helpers/Location"
import { useFirestoreGeneralTwo as useFirestoreGeneralTwoDeccos } from "../../firebase/useFirestoreDeccos"
import { useFirestoreGeneral as useFirestoreGeneralDeccos } from "../../firebase/useFirestoreDeccos"
import { useFirestoreGeneral, useFirestoreGeneralTwo } from "../../firebase/useFirestore"
import { collection, query, where, getDocs } from "firebase/firestore";
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
import { httpsCallable } from "firebase/functions";
import OutputConnecter from '../../components/themeConnecter/OutputConnecter';

const ThemeConnecter = () => {

  const [compagnyName, setCompagnyName] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState('')
  const [outputsToUpdate, setOutputsToUpdate] = useState([])

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

  const compagnies = useFirestoreGeneralDeccos('CompagnyMeta', 'CompagnyID', compagnyId ? compagnyId : '')
  const themes = useFirestoreGeneral('themes', 'compagny', portfolioId ? portfolioId : '')
  const themeOutputs = useFirestoreGeneral('themeOutputs', 'themeId', selectedTheme ? selectedTheme : '')

  console.log(outputsToUpdate)

  // Set the compagny name in state
  useEffect(() => {
    compagnies && compagnies.map(item => (
      setCompagnyName(item.CommunityName)
    ))
  }, [compagnies])

  // Add a theme
  const addTheme = async () => {

    // Update the existing outputs in the project database
    if(outputsToUpdate.length > 0) {
      outputsToUpdate.forEach(item => {
        updateExistingOutput(item)
      })
    }

    // Close the modal
    setOpenModal(false)

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

  const updateExistingOutput = async (item) => {

    const data = {
      themeId: item.themeId,
      portfolioId: portfolioId,
      themeOutputId: item.themeOutputId,
      docid: item.docid,
    }

    // Update the existing output in the project database via a cloud function
    const updateOutput = httpsCallable(functionsDeccos, 'updateOutput');

    updateOutput({ data: data })
      .then((result) => {
        if(result.data === 'success') {
          console.log('Output updated')
        } else {
          alert(`Er is iets mis gegaan, neem contact op met Deccos`)
        }
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
        alert(`Er is iets mis gegaan, neem contact op met Deccos`)
      });

  }

  const closeModal = () => {

    // Close the modal
    setOpenModal(false)

    // Clean the state
    setOutputsToUpdate([])
    setSelectedTheme('')
    
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
          {/* {themesConnections && themesConnections.map(item => (
              <tr key={item.id} >
                <td>
                    <ThemeMeta themeId={item.themeId} />
                </td>
                <td>
                
                </td>
                <td>
                  <Tooltip content='Thema verwijderen' width='80%' left='30px' top='-5px'>
                      <DeleteOutlineOutlinedIcon className="delete-icon" data-docid={item.docid} onClick={deleteTheme} />
                  </Tooltip>
                </td>
            </tr>
          ))}  */}
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
                <th>THEMA OUTPUT</th>
                <th>ORGANISATIE OUTPUT</th>
            </tr>
            {themeOutputs && themeOutputs.map(item => (
                <OutputConnecter 
                themeOutput={item}
                setOutputsToUpdate={setOutputsToUpdate}
                outputsToUpdate={outputsToUpdate}
                selectedTheme={selectedTheme}
                />
              ))}
          </table>
          </div>
          <div id='modal-button-container'>
            <button id='modal-cancel-button' onClick={closeModal}>Annuleren</button>
            <button onClick={addTheme}>Opslaan</button>
          </div>

         </div>
        </div>
    </Modal>
  </div>
  )
}

export default ThemeConnecter