import { useFirestoreGeneralTwo } from '../../firebase/useFirestore'
import { doc, setDoc, updateDoc, serverTimestamp, deleteDoc } from "firebase/firestore"; 
import { db } from "../../firebase/config"
import { v4 as uuid } from 'uuid';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Location from '../../helpers/Location'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const IndicatorDetails = () => {
    // State
    const [question, setQuestion] = useState('')
    const [questionType, setQuestionType] = useState('')
    const [reachStart, setReachStart] = useState('')
    const [reachStartLabel, setReachStartLabel] = useState('')
    const [reachEnd, setReachEnd] = useState('')
    const [reachEndLabel, setReachEndLabel] = useState('')
    const [multipleOption, setMultipleOption] = useState('')
    const [showAddNewItemOptions, setShowAddNewItemOptions] = useState(false)
    
    // Hooks
    const client = Location()[3]
    const effectId = Location()[4]
    const indicatorId = Location()[5]
    const navigate = useNavigate()

    // Firestore
    const multipleQuestionOptions = useFirestoreGeneralTwo('multipleQuestionOptions', 'companyId', client ? client : '', 'effectId', effectId ? effectId : '')
    const indicator = useFirestoreGeneralTwo('indicators', 'companyId', client ? client : '', 'effectId', effectId ? effectId : '', 'id', indicatorId ? indicatorId : '')
    const allIndicators  = useFirestoreGeneralTwo('indicators', 'companyId', client ? client : '', 'effectId', effectId ? effectId : '')

    // Set the defualt values
    useEffect(() => {
        if(indicator.length > 0){
            setQuestion(indicator[0].question)
            setQuestionType(indicator[0].questionType)
            setReachStart(indicator[0].reachStart)
            setReachStartLabel(indicator[0].reachStartLabel)
            setReachEnd(indicator[0].reachEnd)
            setReachEndLabel(indicator[0].reachEndLabel)
        }
    }, [indicator])

    // Handle multiple options
    const multipleHandler = async () => {

        await setDoc(doc(db, "multipleQuestionOptions", uuid()), {
            companyId: client,
            option: multipleOption,
            createdAt: serverTimestamp(),
            id: uuid(),
            effectId: effectId
        })

        setMultipleOption('')
    }
    
    // Delete multiple options
    const deleteOptionHandler = async (e) => {
        const docid = e.target.dataset.docid
    
        await deleteDoc(doc(db, "multipleQuestionOptions", docid))
    }

    // Save indicator
    const saveIndicator = async () => {
        await setDoc(doc(db, "indicators", uuid()), {
            companyId: client,
            question: question,
            questionType: questionType,
            type: questionType,
            reachStart: reachStart,
            reachStartLabel: reachStartLabel,
            reachEnd: reachEnd,
            reachEndLabel: reachEndLabel,
            createdAt: serverTimestamp(),
            id: uuid(),
            position: allIndicators.length + 1,
            effectId: effectId
        });
    }

    // Add new item options container
    const addNewItemOptions = () => {
        setShowAddNewItemOptions(!showAddNewItemOptions)
    }

  return (
    <div className='add-new-indicator-container' >
            <h3>Vraag</h3>
            <input type="text" placeholder="Noteer hier je vraag" value={question} onChange={(e) => setQuestion(e.target.value)} />
            <h3>Type vraag</h3>
            <select name="" id="" value={questionType} onChange={(e) => setQuestionType(e.target.options[e.target.selectedIndex].value)}>
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
                        <select name="" id="" value={reachStart} onChange={(e) => setReachStart(e.target.options[e.target.selectedIndex].value)}>
                        <option value="">-- Selecteer een onderwaarde --</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        </select>
                        <input type="text" value={reachStartLabel} placeholder='Voeg label toe (optioneel)' onChange={(e) => setReachStartLabel(e.target.value)}/>
                    </div>
                    <div>
                        <p>t/m</p>
                    </div>
                    <div>
                        <p>Selecteer bovenwaarde</p>
                        <select name="" id="" value={reachEnd} onChange={(e) => setReachEnd(e.target.options[e.target.selectedIndex].value)}>
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
                        <input type="text" value={reachEndLabel} placeholder='Voeg label toe (optioneel)' onChange={(e) => setReachEndLabel(e.target.value)}/>
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
                        {multipleQuestionOptions && multipleQuestionOptions.map(option => (
                            <div key={option.id}>
                            <li >{option.option}</li>
                            <DeleteOutlineOutlinedIcon data-docid={option.docid} onClick={deleteOptionHandler} />
                            </div>
                        ))}
                        </ul>
                    </div>
                </div>
            }
            <button onClick={saveIndicator}>Voeg indicator toe</button>
        </div>
  )
}

export default IndicatorDetails