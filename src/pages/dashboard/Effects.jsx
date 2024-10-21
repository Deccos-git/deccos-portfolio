import { useFirestoreGeneral } from '../../firebase/useFirestore'
import Location from '../../helpers/Location'
import Tooltip from "../../components/common/Tooltip";
import PodcastsOutlinedIcon from '@mui/icons-material/PodcastsOutlined';
import { doc, setDoc, updateDoc, serverTimestamp, deleteDoc } from "firebase/firestore"; 
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
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
  const [title, setTitle] = useState('')
  const [question, setQuestion] = useState('')
  const [questionType, setQuestionType] = useState('')
  const [reachStart, setReachStart] = useState('')
  const [reachStartLabel, setReachStartLabel] = useState('')
  const [reachEnd, setReachEnd] = useState('')
  const [reachEndLabel, setReachEndLabel] = useState('')
  const [multipleOption, setMultipleOption] = useState('')
  const [multipleOptions, setMultipleOptions] = useState([])
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
        title: title,
        createdAt: serverTimestamp(),
        id: uuid(),
        position: effects.length + 1,
        question: question,
        questionType: questionType,
        reachStart: reachStart,
        reachStartLabel: reachStartLabel,
        reachEnd: reachEnd,
        reachEndLabel: reachEndLabel,
        multipleOptions: multipleOptions
    });

    setModalOpen(false)
    setTitle('')
    setQuestion('')
    setQuestionType('')
    setReachStart('')
    setReachStartLabel('')
    setReachEnd('')
    setReachEndLabel('')
    setMultipleOption('')
}

const deleteEffect = async (e) => {
    const docid = e.target.dataset.docid

    await deleteDoc(doc(db, "effects", docid))

}

const multipleHandler = async () => {

    setMultipleOptions([...multipleOptions, multipleOption])
    setMultipleOption('')
}

const deleteOptionHandler = async (e) => {
    const option = e.target.dataset.option

    const newOptions = multipleOptions.filter(item => item !== option)
    setMultipleOptions(newOptions)
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
                  <AddCircleOutlineOutlinedIcon className="add-icon" onClick={() => setModalOpen(true)} />
              </Tooltip>
          </div>
          <table>
            <tr>
                <th>EFFECT</th>
                <th>DETAILS</th>
                <th>VERWIJDEREN</th>
            </tr>
              {effects && effects.map(item => (
                <tr key={item.id}>
                  <td>
                      <input type="text" defaultValue={item.title} data-docid={item.docid} onChange={effectHandler} placeholder="Noteer hier je effect" />
                  </td>
                  <td>
                      <Tooltip content='Details bekijken' width='80%' left='30px' top='-5px'>
                          <SearchOutlinedIcon className="table-icon" onClick={() => navigate(`/dashboard/effectDetail/${id}/${item.id}`)}/>
                      </Tooltip>
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
        <Modal
        isOpen={openModal}
        onRequestClose={openModal}
        style={modalStyles}
        contentLabel="Create effect"
        >
          <div id='modal-container'>
            <div id='modal-title-container'>
              <PodcastsOutlinedIcon/>
              <h1>Voeg nieuw effect toe</h1>
            </div>
            <div>
              <div>
                <h3>Titel</h3>
                <input type="text" placeholder="Noteer hier je effect" onChange={(e) => setTitle(e.target.value)} />
                <h3>Vraag</h3>
                <input type="text" placeholder="Noteer hier je vraag" onChange={(e) => setQuestion(e.target.value)} />
                <h3>Type vraag</h3>
                <select name="" id="" onChange={(e) => setQuestionType(e.target.options[e.target.selectedIndex].value)}>
                  <option value="">-- Selecteer een type vraag --</option>
                  <option value="open">Open vraag</option>
                  <option value="scale">Schaalvraag</option>
                  <option value="multiple-one">Meerkeuze vraag (één optie)</option>
                  <option value="multiple-multiple">Meerkeuze vraag (meerdere opties)</option>
                </select>
                {questionType === 'scale' && 
                  <div>
                    <h3>Schaalvraag details</h3>
                    <div>
                      <p>Selecteer onderwaarde</p>
                      <select name="" id="" onChange={(e) => setReachStart(e.target.options[e.target.selectedIndex].value)}>
                        <option value="">-- Selecteer een onderwaarde --</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </select>
                      <input type="text" placeholder='Voeg label toe (optioneel)' onChange={(e) => setReachStartLabel(e.target.value)}/>
                    </div>
                    <div>
                      <p>t/m</p>
                    </div>
                    <div>
                      <p>Selecteer bovenwaarde</p>
                      <select name="" id="" onChange={(e) => setReachEnd(e.target.options[e.target.selectedIndex].value)}>
                        <option value="">-- Selecteer een bovenwaarde --</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                      <input type="text" placeholder='Voeg label toe (optioneel)' onChange={(e) => setReachEndLabel(e.target.value)}/>
                    </div>
                    
                  </div>
                }
                {(questionType === 'multiple-one' || questionType === 'multiple-multiple') &&
                  <div>
                    <h3>Meerkeuze vraag details</h3>
                    <div>
                      <p>Voeg optie toe</p>
                      <p>Of voeg 'Overige' toe</p>
                      <input type="text" placeholder="Noteer hier je optie" onChange={(e) => setMultipleOption(e.target.value)} />
                      <button onClick={multipleHandler}>Voeg toe</button>
                    </div>
                    <div>
                      <ul>
                        {multipleOptions && multipleOptions.map(option => (
                          <div key={option}>
                            <li >{option}</li>
                            <button data-option={option} onClick={deleteOptionHandler}>Verwijder</button>
                          </div>
                        ))}
                      </ul>
                    </div>
                  </div>
                }
              </div>
              <div id='modal-button-container'>
                <button id='modal-cancel-button' onClick={() => setModalOpen(false)}>Annuleren</button>
                <button onClick={addEffect}>Opslaan</button>
              </div>
            </div>
          </div>
      </Modal>
    </div>
  )
}

export default Effects