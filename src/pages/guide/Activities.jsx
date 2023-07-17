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

const Activities = () => {

    const id = Location()[3]

    const activities = useFirestoreGeneral('activities', 'compagny', id)

    const text = () => {
        return (
            <>
                <p>
                    <b>
                        Activiteiten zijn de acties die je onderneemt om je doel te bereiken.
                    </b>
                </p>
            </>
        )
    }

    const activityHandler = async (e) => {
        const docid = e.target.dataset.docid

        await updateDoc(doc(db, "activities", docid), {
            title: e.target.value,
          })
    }

    const addActivity = async () => {

        await setDoc(doc(db, "activities", uuid()), {
            compagny: id,
            title: '',
            createdAt: serverTimestamp(),
            id: uuid()
        });
    }

    const deleteActivity = async (e) => {
        const docid = e.target.dataset.docid

        await deleteDoc(doc(db, "activities", docid))
    }


    const settings = () => {
        return (
            <div className='table-container'>
                <div className="add-icon-container">
                    <Tooltip content='Activiteit toevoegen' width='80%' left='30px' top='-5px'>
                        <AddCircleOutlineOutlinedIcon className="add-icon" onClick={addActivity} />
                    </Tooltip>
                </div>
            <table>
              <tr>
                  <th>ACTIVITEIT</th>
                  <th>VERWIJDEREN</th>
              </tr>
                {activities && activities.map(item => (
                  <tr key={item.ID} >
                    <td>
                        <input type="text" defaultValue={item.title} data-docid={item.docid} onChange={activityHandler} placeholder="Noteer hier je activiteit" />
                    </td>
                    <td>
                        <Tooltip content='Activiteit verwijderen' width='80%' left='30px' top='-5px'>
                            <DeleteOutlineOutlinedIcon className="delete-icon" data-docid={item.docid} onClick={deleteActivity} />
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
        title="Activiteiten" 
        />
        <Navigation
        next="Outputs"
        nextLink="outputs"
        prev="Maatschappelijk doel"
        prevLink="goal"
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

export default Activities