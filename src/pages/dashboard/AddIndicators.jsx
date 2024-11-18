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

const AddIndicators = () => {
    // State
    const [title, setTitle] = useState('')
    const [question, setQuestion] = useState('')
    const [questionType, setQuestionType] = useState('')
    const [reachStart, setReachStart] = useState('')
    const [reachStartLabel, setReachStartLabel] = useState('')
    const [reachEnd, setReachEnd] = useState('')
    const [reachEndLabel, setReachEndLabel] = useState('')
    const [multipleOption, setMultipleOption] = useState('')
    const [multipleOptions, setMultipleOptions] = useState([])

    // Hooks
    const client = Location()[3]

    // Firestore
    const indicators  = useFirestoreGeneral('indicators', 'compagny', client)

    // Handle multiple options
    const multipleHandler = async () => {

        setMultipleOptions([...multipleOptions, multipleOption])
        setMultipleOption('')
    }
    
    // Delete multiple options
    const deleteOptionHandler = async (e) => {
        const option = e.target.dataset.option
    
        const newOptions = multipleOptions.filter(item => item !== option)
        setMultipleOptions(newOptions)
    }

    // Handle title change
    const titleHandler = async (e) => {
        const docid = e.target.dataset.docid

        await updateDoc(doc(db, "indicators", docid), {
            title: e.target.value,
        })
    }

    // Delete indicator
    const deleteIndicator = async (e) => {
        const docid = e.target.dataset.docid

        console.log(e.target.dataset)

        await deleteDoc(doc(db, "indicators", docid))
    }

    // Save indicator
    const saveIndicator = async () => {
        await setDoc(doc(db, "indicators", uuid()), {
            compagny: client,
            question: question,
            questionType: questionType,
            type: questionType,
            reachStart: reachStart,
            reachStartLabel: reachStartLabel,
            reachEnd: reachEnd,
            reachEndLabel: reachEndLabel,
            multipleOptions: multipleOptions,
            createdAt: serverTimestamp(),
            id: uuid(),
            position: indicators.length + 1,
        });

        setTitle('')
        setQuestion('')
        setQuestionType('')
        setReachStart('')
        setReachStartLabel('')
        setReachEnd('')
        setReachEndLabel('')
        setMultipleOptions([])
    }


  return (
    <div className='page-container'>
        <div className='page-top-container'>
          <div className='page-header-title-container'>
            <h1>Indicatoren</h1>
          </div>
        </div>
        <div>
            <table>
                <tr>
                    <th>INDICATOR</th>
                    <th>TYPE</th>
                    <th>VERWIJDEREN</th>
                </tr>
                {indicators && indicators.map(item => (
                    <tr key={item.id}>
                    <td>
                        <input type="text" defaultValue={item.question} data-docid={item.docid} onChange={titleHandler} placeholder="Noteer hier je indicator" />
                    </td>
                    <td>
                        <p>{item.questionType}</p>
                    </td>
                    <td>
                        <Tooltip content='Effect verwijderen' width='80%' left='30px' top='-5px'>
                            <DeleteOutlineOutlinedIcon className="delete-icon" data-docid={item.docid} onClick={deleteIndicator} />
                        </Tooltip>
                    </td>
                    </tr>
                ))}
            </table>
        </div>
         <div className='table-container section-container'>
            <h3>Vraag</h3>
            <input type="text" placeholder="Noteer hier je vraag" onChange={(e) => setQuestion(e.target.value)} />
            <h3>Type vraag</h3>
            <select name="" id="" onChange={(e) => setQuestionType(e.target.options[e.target.selectedIndex].value)}>
                <option value="">-- Selecteer een type vraag --</option>
                <option value="open">Open vraag</option>
                <option value="scale">Schaalvraag</option>
                <option value="multiple-one">Meerkeuze vraag (één optie)</option>
                <option value="multiple-multiple">Meerkeuze vraag (meerdere opties)</option>
                <option value="multiple-one">Matrix vraag (één optie)</option>
                <option value="matrix-multiple">Matrix vraag (meerdere opties)</option>
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
            <button onClick={saveIndicator}>Voeg indicator toe</button>
        </div>
    </div>
  )
}

export default AddIndicators