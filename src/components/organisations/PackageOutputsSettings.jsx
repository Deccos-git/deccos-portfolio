import { useFirestoreGeneral } from '../../firebase/useFirestore'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Tooltip from '../common/Tooltip';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { doc, setDoc, updateDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import ButtonClicked from '../common/ButtonClicked';
import Location from '../../helpers/Location';
import PackageOutputGoals from '../packages/PackageOutputGoals';

const PackageOutputsSettings = ({id, organisation}) => {
    const [addGoal, setAddGoal] = useState(false)
    const [number, setNumber] = useState(0)
    const [date, setDate] = useState('')

    const compagny = Location()[3]

    const packageOutputs = useFirestoreGeneral('packageOutputs', 'packageId', id)

    const showAddGoalToggle = () => {
        setAddGoal(!addGoal)
    }

    const numberHandler = (e) => {
        setNumber(e.target.value)
    }

    const dateHandler = (e) => {
        setDate(e.target.value)
    }

    const saveGoal = (e) => {
        const packageOutputId = e.target.dataset.id

        ButtonClicked(e, 'Opgeslagen')

        setDoc(doc(db, "packageOutputGoals", uuid()), {
            packageOutputId: packageOutputId,
            goal: number,
            deadline: date,
            createdAt: serverTimestamp(),
            id: uuid(),
            compagny: compagny,
            organisationId: organisation
        });

        setAddGoal(!addGoal)
    }

  return (
    <>
        {packageOutputs && packageOutputs.map((item) => (
            <div>
                <div id='guide-organisations-output-goal-title'>
                    <p><b>{item.title}</b></p>
                    <Tooltip content='Voeg een output doel toe'>
                        <AddCircleOutlineOutlinedIcon id='guide-organisations-output-goal-add' onClick={showAddGoalToggle} />
                    </Tooltip>
                </div>
                <div style={{display: addGoal ? 'block' : 'none'}}>
                    <div className="guide-organisations-output-goal-container">
                        <p><b>Doel</b></p>
                        <input type="number" onChange={numberHandler}/>
                    </div>
                    <div className="guide-organisations-output-goal-container">
                        <p><b>Deadline</b></p>
                        <input type="date" onChange={dateHandler} />
                    </div>
                    <button className='button-simple' data-id={item.id} onClick={saveGoal}>Opslaan</button>
                </div>
                <PackageOutputGoals item={item} organisation={organisation}/>
            </div>
        ))}
    </>
  )
}

export default PackageOutputsSettings