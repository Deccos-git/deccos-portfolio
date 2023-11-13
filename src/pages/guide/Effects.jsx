import Topbar from "../../components/guide/Topbar"
import Navigation from "../../components/guide/Navigation"
import Instructions from "../../components/guide/Instructions"
import Settings from "../../components/guide/Settings"
import Location from "../../helpers/Location"
import { db } from "../../firebase/config"
import { useFirestoreGeneral } from "../../firebase/useFirestore"
import { doc, setDoc, updateDoc, serverTimestamp, deleteDoc } from "firebase/firestore"; 
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Tooltip from '../../components/common/Tooltip'
import { v4 as uuid } from 'uuid';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from "react-router-dom";
import EffectTerm from "../../components/effects/EffectTerm";

const Effects = () => {

  const id = Location()[3]
  
  const navigate = useNavigate()

  const effects = useFirestoreGeneral('effects', 'compagny', id)

  const text = () => {
      return (
          <>
              <p>
                  <b>
                    Wat zijn de concrete en meetbare effecten die jullie doelgroep ervaart aan de hand van jullie activiteiten?
                  </b>
              </p>
          </>
      )
  }

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
          id: uuid()
      });
  }

  const deleteEffect = async (e) => {
      const docid = e.target.dataset.docid

      await deleteDoc(doc(db, "effects", docid))
  }

  const settings = () => {
      return (
          <div className='table-container'>
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
      )
  }


  return (
    <>
        <Topbar 
        title="Effecten" 
        />

        <Navigation
        prev="Outputs"
        prevLink="outputs"
        next='Themas'
        nextLink='themes'
        />
       
        <Instructions
        text={text()}
        />
        <Settings
        settings={settings()}
        />
    </>
  )
}

export default Effects