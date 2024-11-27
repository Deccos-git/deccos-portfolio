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
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import MeetstandaardIcon from '../../assets/meetstandaard-icon.png';
import MeetstandaardLogo from '../../assets/logo-meetstandaard-alt.png';
import AddItemRow from '../../components/common/AddItemRow';

const Effects = () => {
  // State
    const [showAddOptions, setShowAddOptions] = useState(false)

  // Hooks
  const client = Location()[3]
  const id = Location()[3]
  const navigate = useNavigate()
  
  // Firestore
  const effects  = useFirestoreGeneral('effects', 'companyId', client)

  // Update effect title
  const effectHandler = async (e) => {
    const docid = e.target.dataset.docid

    await updateDoc(doc(db, "effects", docid), {
        title: e.target.value,
      })
}

// Add new effect
const addEffect = async () => {

    await setDoc(doc(db, "effects", uuid()), {
        companyId: id,
        title: '',
        createdAt: serverTimestamp(),
        id: uuid(),
        position: effects.length + 1,
    });

    setShowAddOptions(false)
}

// Delete effect
const deleteEffect = async (e) => {

    const docid = e.target.dataset.docid

    await deleteDoc(doc(db, "effects", docid))
}

// Toggle add options container
const toggleAddOptions = () => {
    setShowAddOptions(!showAddOptions)
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
                          <AddCircleOutlineOutlinedIcon className="add-icon" onClick={() => navigate(`/impactstrategy/addindicators/${id}/${item.id}`)} />
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
          <AddItemRow content='Output toevoegen' onClick={toggleAddOptions} />
            {showAddOptions && 
            <div className='add-options-container'>
                <div className='add-options-content'>
                    <AddCircleOutlineOutlinedIcon className="add-icon" onClick={addEffect} />
                    <p>Eigen effect toevoegen</p>
                </div>
                <div className='add-options-content'>
                    <img src={MeetstandaardIcon} className="add-icon" onClick={() => navigate(`/impactstrategy/selectmsieffects/${id}`)} />
                    <p>Gestandaardiseerd effect toevoegen</p>
                </div>
            </div>}
        </div>
    </div>
  )
}

export default Effects