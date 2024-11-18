import { useFirestoreGeneral } from '../../firebase/useFirestore'
import Location from '../../helpers/Location'
import Tooltip from "../../components/common/Tooltip";
import PodcastsOutlinedIcon from '@mui/icons-material/PodcastsOutlined';
import { doc, setDoc, updateDoc, serverTimestamp, deleteDoc } from "firebase/firestore"; 
import IndicatorCount from '../../components/effects/IndicatorCount';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { db } from "../../firebase/config"
import { v4 as uuid } from 'uuid';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Modal from 'react-modal';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import MeetstandaardIcon from '../../assets/meetstandaard-icon.png';
import MeetstandaardLogo from '../../assets/logo-meetstandaard-alt.png';
import SelectEffects from '../../components/meetstandaard/SelectEffects';
import Api from '../../components/meetstandaard/Api';

const Effects = () => {
  // State
  const [openModal, setModalOpen] = useState(false)
  const [MSIModalOpen, setMSIModalOpen] = useState(false)
  const [selectedEffects, setSelectedEffects] = useState([])

  // Hooks
  const client = Location()[3]
  const id = Location()[3]
  const navigate = useNavigate()
  const api = Api()
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
  const effects  = useFirestoreGeneral('effects', 'compagny', client)
    const indicators  = useFirestoreGeneral('indicators', 'compagny', client)

  // Functions
  const effectHandler = async (e) => {
    const docid = e.target.dataset.docid

    await updateDoc(doc(db, "effects", docid), {
        title: e.target.value,
      })
}

const addEffect = async () => {

    await setDoc(doc(db, "effects", uuid()), {
        compagny: id,
        title: '',
        createdAt: serverTimestamp(),
        id: uuid(),
        position: effects.length + 1,
    });

    setModalOpen(false)
}

const deleteEffect = async (e) => {
    const docid = e.target.dataset.docid

    await deleteDoc(doc(db, "effects", docid))

}

// Save selected effects from MSI
const saveSelectedEffects = async () => {
    // Loop through the selected effects
    selectedEffects.map(async (effect) => {
        // Check if the effect already exists
        const existingEffect = effects.find(item => item.title === effect.effect)
        if (!existingEffect) {
            // If the effect does not exist, add it to the database
            await setDoc(doc(db, "effects", uuid()), {
                compagny: id,
                title: effect.effect,
                createdAt: serverTimestamp(),
                id: uuid(),
                position: effects.length + 1,
                questions: effect.questions
            });

            await setDoc(doc(db, "indicators", uuid()), {
                compagny: id,
                questionType: 'scale',
                reachStart: 0,
                reachStartLabel: 'Helemaal niet',
                reachEnd: 100,
                reachEndLabel: 'Helemaal wel',
                createdAt: serverTimestamp(),
                id: uuid(),
                position: indicators.length + 1,
                effect: effect.effect,
                msiId: effect.id
            });
        }
    })

    // Close the modal
    setMSIModalOpen(false)
    setSelectedEffects([])
}

  return (
    <div className='page-container'>
        <div className='page-top-container'>
          <div className='page-header-title-container'>
            <PodcastsOutlinedIcon/>
            <h1>Effecten</h1>
          </div>
        </div>
         <div className='table-container section-container'>
          <div className="add-icon-container">
              <Tooltip content='Gestandaardiseerd effect toevoegen' width='30px' left='30px' top='-5px'>
                  <img src={MeetstandaardIcon} className="add-icon" onClick={() => navigate(`/dashboard/selectmsieffects/${id}`)} />
              </Tooltip>
              <Tooltip content='Effect toevoegen' width='30px' left='30px' top='-5px'>
                  <AddCircleOutlineOutlinedIcon className="add-icon" onClick={addEffect} />
              </Tooltip>
          </div>
          <table>
            <tr>
                <th>EFFECT</th>
                <th>INDICATOREN</th>
                <th>VERWIJDEREN</th>
            </tr>
              {effects && effects.map(item => (
                <tr key={item.id}>
                  <td>
                      <input type="text" defaultValue={item.title} data-docid={item.docid} onChange={effectHandler} placeholder="Noteer hier je effect" />
                  </td>
                  <td>
                      <Tooltip content='Indicatoren toevoegen' width='80%' left='30px' top='-5px'>
                          <AddCircleOutlineOutlinedIcon className="add-icon" onClick={() => navigate(`/dashboard/addindicators/${id}/${item.id}`)} />
                      </Tooltip>
                      <IndicatorCount id={item.id} />
                  </td>
                  <td>
                      <Tooltip content='Effect verwijderen' width='80%' left='30px' top='-5px'>
                          <DeleteOutlineOutlinedIcon className="delete-icon" data-docid={item.docid} onClick={deleteEffect} />
                      </Tooltip>
                  </td>
                </tr>
              ))}
          </table>
        </div>
        <Modal
        isOpen={MSIModalOpen}
        onRequestClose={MSIModalOpen}
        style={modalStyles}
        contentLabel="MSI effecten selecteren"
        >
            <div>
                <div className="page-header">
                    <img src={MeetstandaardLogo} alt="" />
                    <h1>Meetstandaard Social Impact</h1>
                </div>
                <div>
                    {api
                    
                    ? 
                    
                        api.map((category, index) => (
                            <SelectEffects category={category} index={index} setSelectedEffects={setSelectedEffects} />
                        ))
                
                    :
                        <img src={MeetstandaardIcon} alt="" />
                    }
                </div> 
                <div id='modal-button-container'>
                    <button id='modal-cancel-button'onClick={() => setModalOpen(false)}>Annuleren</button>
                    <button id='modal-save-button'  onClick={saveSelectedEffects}>Opslaan</button>
                </div>
            </div>
        </Modal>
    </div>
  )
}

export default Effects