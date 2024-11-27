import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useState } from "react";
import Location from '../../helpers/Location';
import { useFirestoreGeneral, useFirestoreGeneralTwoOrderBy } from '../../firebase/useFirestore';
import Tooltip from "../../components/common/Tooltip";
import Modal from 'react-modal';
import { doc, setDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config"
import { v4 as uuid } from 'uuid';
import OutputMeta from '../../components/outputs/OutputMeta';
import { functionsDeccos } from "../../firebase/configDeccos";
import { httpsCallable } from "firebase/functions";
import ProjectOutputMeta from '../../components/synchronisations/ProjectOutputMeta';
import ProjectMeta from '../../components/synchronisations/ProjectMeta';
import spinner from "../../assets/spinner-ripple.svg";
import deleteIcon from "../../assets/icons/delete-icon.png";
import EffectMeta from '../../components/effects/EffectMeta';

const Synchronisations = () => {

    // State
    const [openModal, setModalOpen] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [loading, setLoading] = useState(false)
    const [syncType, setSyncType] = useState('output')
    const [openEffectsModal, setEffectsModalOpen] = useState(false)

    // Hooks
    const portfolioId = Location()[3]
    const compagnyId = Location()[4]
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

    // Firestore
    const synchronisations = useFirestoreGeneralTwoOrderBy('synchronisations', 'compagnyId', compagnyId, 'portfolioId', portfolioId, 'position', 'asc')
    const outputs = useFirestoreGeneral('outputs', 'compagny', portfolioId)
    const effects = useFirestoreGeneral('effects', 'compagny', portfolioId)

    // Add sync to portfolio database
  const addSyncToPortfolio = async (item, id) => {

      await setDoc(doc(db, "synchronisations", uuid()), {
        portfolioId: portfolioId,
        compagnyId: compagnyId,
        createdAt: serverTimestamp(),
        id: id,
        position: synchronisations.length + 1,
        syncItem: item,
        type: syncType,
        status: 'requested'
      })
      
      setLoading(false)
      setModalOpen(false)
  }

    // Add sync to project database
    const addSyncToProject = async (item, id) => {

      setLoading(true)

      console.log(syncType)

      const createSync = httpsCallable(functionsDeccos, 'createSync');

      const data = {
        compagnyId: compagnyId,
        portfolioId: portfolioId,
        syncItem: item,
        type: syncType,
        status: 'requested',
        id: id,
      }

      createSync({ data: data })
        .then((result) => {
          if(result.data === 'Synchronisation created') {
            console.log('Status updated in Deccos Project database')
            // If the function returns a success update the project database
            addSyncToPortfolio(item, id)
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

    // Functions
    const addSynchronisation = () => {

        selectedOptions.map(async item => {

          const id = uuid()

          await addSyncToProject(item, id)

        })

        setModalOpen(false)
    }

    const outputHandler = (event) => {
        const value = event.target.value;
        if (event.target.checked) {
          // Add the selected option to the array
          setSelectedOptions([...selectedOptions, value]);
        } else {
          // Remove the unselected option from the array
          setSelectedOptions(selectedOptions.filter(option => option !== value));
        }
    };

    const status = (statusCode) => {
      switch (statusCode) {
        case 'requested':
          return { text: 'Aangevraagd', color: '#FFA500' }; // Orange
        case 'accepted':
          return { text: 'Geaccepteerd', color: '#008000' }; // Green
        case 'declined':
          return { text: 'Geweigerd', color: '#FF0000' }; // Red
        case 'deleted':
          return { text: 'Verwijderd', color: '#000000' }; // Black
        default:
          return { text: 'Onbekende status', color: '#000000' }; // Black
      }
    }

    const syncStatus = (statusCode) => {
      switch (statusCode) {
        case 'requested':
          return { text: 'Inactief', color: '#FFA500' }; // Orange
        case 'accepted':
          return { text: 'Actief', color: '#008000' }; // Green
        case 'declined':
          return { text: 'Inactief', color: '#FF0000' }; // Red
        case 'deleted':
          return { text: 'Inactief', color: '#FF0000' }; // Black
        default:
          return { text: 'Onbekende status', color: '#000000' }; // Black
      }
    }

    const itemType = (type) => {
      switch (type) {
        case 'output':
          return 'Output';
        case 'effect':
          return 'Effect';
        default:
          return 'Onbekend';
      }
    }

    const updateDatabase = async (docid, status) => {

      await updateDoc(doc(db, "synchronisations", docid),{
        status: status
      })

    }

    const updateProjectSyncStatus = async (docid, status, id) => {

      const updateSyncStatus = httpsCallable(functionsDeccos, 'updateSyncStatus');

      const data = {
        status: status,
        syncId: id
      }

      updateSyncStatus({ data: data })
        .then((result) => {
          if(result.data === 'Success') {
            console.log('Synchronisation status updated')
            // If the function returns a success update the database
            updateDatabase(docid, status)
          } else {
            alert(`Er is iets mis gegaan: cloud function geeft foutmelding, neem contact op met Deccos`)
          }
        })
        .catch((error) => {
          // Handle errors
          console.error(error);
          alert(`Er is iets mis gegaan, neem contact op met Deccos`)
        });

    }

    const deleteSync = (e) => {

      const docid = e.target.dataset.docid
      const id = e.target.dataset.id

      console.log(docid, id)

      updateProjectSyncStatus(docid, 'deleted', id)

    }

    const openoutputsModal = () => {
      setSyncType('output')
      setModalOpen(true)
    }

    const openModalEffects = () => {
      setSyncType('effect')
      setEffectsModalOpen(true)
    }


  return (
    <div className='page-container'>
    <div className='page-top-container'>
      <div className='page-header-title-container'>
        <SyncOutlinedIcon/>
        <h1>Synchronisaties</h1>
        <p><ProjectMeta projectId={compagnyId}/></p>
      </div>
    </div>
    <div className='table-container'>
        <div className="add-icon-container add-icon-button-container">
            <div className='add-item-button'>
              <AddCircleOutlineOutlinedIcon className="add-icon" onClick={openoutputsModal} />
              <p>Voeg outputs toe</p>
            </div>
            <div className='add-item-button'>
              <AddCircleOutlineOutlinedIcon className="add-icon" onClick={openModalEffects} />
              <p>Voeg effecten toe</p>
            </div>
        </div>
      <table>
        <tr>
            <th>SYNCHRONISATIE</th>
            <th>TYPE</th>
            <th>STATUS</th>
            <th>KOPPELING</th>
            <th>SYNCHRONISATIE</th>
            <th>VERWIJDEREN</th>
        </tr>
        {synchronisations && synchronisations.map(item => (
            <tr key={item.Id} >
              <td>
                  {item.type === 'output' ? <OutputMeta output={item.syncItem} /> : <EffectMeta effect={item.syncItem} />}
              </td>
              <td>
                  <p>{itemType(item.type)}</p>
              </td>
              <td>
                  <p style={{color: status(item.status).color}}>{status(item.status).text}</p>
              </td>
              <td>
                  <ProjectOutputMeta projectOutputId={item.projectOutput}/>
              </td>
              <td>
                <p>{syncStatus(item.status).text}</p>
              </td>
              <td>
                <img src={deleteIcon} alt="" className="delete-icon" data-docid={item.docid} data-id={item.id} onClick={deleteSync}/>
              </td>
          </tr>
        ))} 
        {loading ? <img src={spinner} alt="" /> : null}
      </table>
    </div>

    {/* Modal to sync outputs */}
    <Modal
      isOpen={openModal}
      onRequestClose={openModal}
      style={modalStyles}
      contentLabel="Create synchronisation"
      >
        <div id='modal-container'>
          <div id='modal-title-container'>
            <SyncOutlinedIcon/>
            <h1>Creer synchronisatie</h1>
          </div>
         <div>
          <div>
            <p><b>Selecteer outputs</b></p>
            <div id='modal-input-container'>
            {outputs && outputs.map(item => (
                <div key={item.id} className='input-checkbox-container'>
                <input
                    type="checkbox"
                    id={item.id}
                    name="outputOptions"
                    value={item.id}
                    checked={selectedOptions.includes(item.id)}
                    onChange={outputHandler}
                />
                <label htmlFor={item.id}>{item.title}</label>
                </div>
            ))}
          </div>
          <div id='modal-button-container'>
            <button id='modal-cancel-button' onClick={() => setModalOpen(false)}>Annuleren</button>
            <button onClick={addSynchronisation}>Opslaan</button>
          </div>

         </div>
        </div>
        </div>
    </Modal>

    {/* Modal to sync effects */}
    <Modal
      isOpen={openEffectsModal}
      onRequestClose={openEffectsModal}
      style={modalStyles}
      contentLabel="Create synchronisation"
      >
        <div id='modal-container'>
          <div id='modal-title-container'>
            <SyncOutlinedIcon/>
            <h1>Creer synchronisatie</h1>
          </div>
         <div>
          <div>
          <p><b>Selecteer effecten</b></p>
            <div id='modal-input-container'>
            {effects && effects.map(item => (
                <div key={item.id} className='input-checkbox-container'>
                <input
                    type="checkbox"
                    id={item.id}
                    name="outputOptions"
                    value={item.id}
                    checked={selectedOptions.includes(item.id)}
                    onChange={outputHandler}
                />
                <label htmlFor={item.id}>{item.title}</label>
                </div>
            ))}
          </div>
          <div id='modal-button-container'>
            <button id='modal-cancel-button' onClick={() => setEffectsModalOpen(false)}>Annuleren</button>
            <button onClick={addSynchronisation}>Opslaan</button>
          </div>

         </div>
        </div>
        </div>
    </Modal>
</div>
  )
}

export default Synchronisations