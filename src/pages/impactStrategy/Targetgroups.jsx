import { useFirestoreGeneral } from '../../firebase/useFirestore'
import Location from '../../helpers/Location'
import Tooltip from "../../components/common/Tooltip";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { doc, setDoc, updateDoc, serverTimestamp, deleteDoc } from "firebase/firestore"; 
import { db } from "../../firebase/config"
import { v4 as uuid } from 'uuid';

const Targetgroups = () => {

     // Hooks
     const client = Location()[3]
  
     // Firestore
     const targetgroups  = useFirestoreGeneral('targetgroups', 'companyId', client)

     // Update targetgroup title
    const titleHandler = async (e) => {
        const docid = e.target.dataset.docid
  
        await updateDoc(doc(db, "targetgroups", docid), {
            title: e.target.value,
          })
      }
  
      // Add new targetgroup
      const addTargetgroup = async () => {
  
        await setDoc(doc(db, "targetgroups", uuid()), {
          compagyId: client,
          title: '',
          createdAt: serverTimestamp(),
          id: uuid(),
          position: targetgroups.length + 1
      });
      }
  
      // Delete targetgroup
      const deleteTargetgroup = async (e) => {
        const docid = e.target.dataset.docid
  
        await deleteDoc(doc(db, "targetgroups", docid))
      }

  return (
    <div className='page-container'>
          <div className='page-top-container'>
          <h1>Doelgroepen</h1>
          </div>
           <div className='table-container'>
            <div className="add-icon-container">
                <Tooltip content='Output toevoegen' width='80%' left='30px' top='-5px'>
                    <AddCircleOutlineOutlinedIcon className="add-icon" onClick={addTargetgroup} />
                </Tooltip>
            </div>
            <table>
              <tr>
                  <th>DOELGROEP</th>
                  <th>VERWIJDEREN</th>
              </tr>
                {targetgroups && targetgroups.map(item => (
                  <tr key={item.ID} >
                    <td>
                      <input type="text" placeholder='Schrijf hier de activiteit' defaultValue={item.title} data-docid={item.docid} onChange={titleHandler}/>
                    </td>
                    <td>
                      <Tooltip content='Doelgroep verwijderen' top='-60px'>
                        <DeleteOutlineOutlinedIcon className="table-icon" data-docid={item.docid} onClick={deleteTargetgroup}/>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
            </table>
          </div>
      </div>
  )
}

export default Targetgroups