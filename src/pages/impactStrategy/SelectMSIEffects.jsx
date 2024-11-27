import MeetstandaardLogo from '../../assets/logo-meetstandaard-alt.png';
import SelectEffects from '../../components/meetstandaard/SelectEffects';
import Api from '../../components/meetstandaard/Api';
import MeetstandaardIcon from '../../assets/meetstandaard-icon.png';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Location from '../../helpers/Location'
import { useFirestoreGeneral } from '../../firebase/useFirestore'
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase/config';
import { v4 as uuid } from 'uuid';

const SelectMSIEffects = () => {
    // State
    const [selectedEffects, setSelectedEffects] = useState([])

    // Hooks
    const navigate = useNavigate()
    const api = Api()
    const id = Location()[3]

    // Firestore
    const effects = useFirestoreGeneral('effects', 'compagny', id)

    // Save selected effects from MSI
    const saveSelectedEffects = async () => {
        // Loop through the selected effects
        selectedEffects.map(async (effect) => {
            // Check if the effect already exists
            const existingEffect = selectedEffects.find(item => item.title === effect.effect)
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

        navigate(`/dashboard/effects/${id}`)
    }

  return (
    <div className='page-container'>
        <div className='page-top-container'>
          <div className='page-header-title-container'>
            <img src={MeetstandaardLogo} alt="" />
            <h1>Meetstandaard Social Impact</h1>
          </div>
        </div>
         <div className='table-container section-container'>
            {api       
            ? 
            
                api.map((category, index) => (
                    <SelectEffects category={category} index={index} setSelectedEffects={setSelectedEffects} />
                ))
        
            :
                <img src={MeetstandaardIcon} alt="" />
            }
        </div>
        <div>
            <button className='button-primary' onClick={saveSelectedEffects}>Opslaan</button>
        </div>
    </div>
  )
}

export default SelectMSIEffects