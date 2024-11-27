import { useFirestoreGeneral } from '../../firebase/useFirestore'
import Location from '../../helpers/Location'
import Tooltip from "../../components/common/Tooltip";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { doc, setDoc, updateDoc, serverTimestamp, deleteDoc } from "firebase/firestore"; 
import { db } from "../../firebase/config"
import { v4 as uuid } from 'uuid';

const Activities = () => {

    // Hooks
    const client = Location()[3]
  
    // Firestore
    const activities  = useFirestoreGeneral('activities', 'companyId', client)

    // Update activity title
    const titleHandler = async (e) => {
      const docid = e.target.dataset.docid

      await updateDoc(doc(db, "activities", docid), {
          title: e.target.value,
        })
    }

    // Add new activity
    const addActivity = async () => {

      await setDoc(doc(db, "activities", uuid()), {
        companyId: client,
        title: '',
        createdAt: serverTimestamp(),
        id: uuid(),
        position: activities.length + 1
    });
    }

    // Delete activity
    const deleteActivity = async (e) => {
      const docid = e.target.dataset.docid

      await deleteDoc(doc(db, "activities", docid))
    }

  
    return (
      <div className='page-container'>
          <div className='page-top-container'>
          <h1>Activiteiten</h1>
          </div>
           <div className='table-container'>
            <div className="add-icon-container">
                <Tooltip content='Output toevoegen' width='80%' left='30px' top='-5px'>
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
                      <input type="text" placeholder='Schrijf hier de activiteit' defaultValue={item.title} data-docid={item.docid} onChange={titleHandler}/>
                    </td>
                    <td>
                      <Tooltip content='Activiteit verwijderen' top='-60px'>
                        <DeleteOutlineOutlinedIcon className="table-icon" data-docid={item.docid} onClick={deleteActivity}/>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
            </table>
          </div>
      </div>
    )
}

export default Activities