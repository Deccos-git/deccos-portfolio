import { useFirestoreGeneral } from '../../firebase/useFirestore'
import Location from '../../helpers/Location'
import Tooltip from "../../components/common/Tooltip";
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import { doc, setDoc, updateDoc, serverTimestamp, deleteDoc } from "firebase/firestore"; 
import EffectTerm from "../../components/effects/EffectTerm";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { db } from "../../firebase/config"
import { v4 as uuid } from 'uuid';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const Effects = () => {

  // Hooks
  const client = Location()[3]
  const id = Location()[3]
  
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
        title: '',
        createdAt: serverTimestamp(),
        id: uuid(),
        position: effects.length + 1
    });
}

const deleteEffect = async (e) => {
    const docid = e.target.dataset.docid

    await deleteDoc(doc(db, "effects", docid))
}

  return (
    <div className='page-container'>
        <div className='page-top-container'>
          <div className='page-header-title-container'>
            <CompareArrowsOutlinedIcon/>
            <h1>Effecten</h1>
          </div>
        </div>
         <div className='table-container section-container'>
          <div className="add-icon-container">
              <Tooltip content='Effect toevoegen' width='80%' left='30px' top='-5px'>
                  <AddCircleOutlineOutlinedIcon className="add-icon" onClick={addEffect} />
              </Tooltip>
          </div>
          <table>
            <tr>
                <th>EFFECT</th>
                <th>TERMIJN</th>
                <th>VERWIJDEREN</th>
            </tr>
              {effects && effects.map(item => (
                <tr key={item.id}>
                  <td>
                      <input type="text" defaultValue={item.title} data-docid={item.docid} onChange={effectHandler} placeholder="Noteer hier je effect" />
                  </td>
                  <td>
                        <EffectTerm item={item} docid={item.docid}/>
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
    </div>
  )
}

export default Effects