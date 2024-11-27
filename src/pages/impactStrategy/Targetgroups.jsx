import { useFirestoreGeneral } from '../../firebase/useFirestore'
import Location from '../../helpers/Location'
import Tooltip from "../../components/common/Tooltip";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { doc, setDoc, updateDoc, serverTimestamp, deleteDoc } from "firebase/firestore"; 
import { db } from "../../firebase/config"
import { v4 as uuid } from 'uuid';
import AddItemRow from '../../components/common/AddItemRow';

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
          companyId: client,
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
            <table>
              <tr>
                  <th>DOELGROEP</th>
                  <th>VERWIJDEREN</th>
              </tr>
                {targetgroups && targetgroups.map(item => (
                  <tr key={item.ID} >
                    <td>
                      <input type="text" placeholder='Schrijf hier de doelgroep' defaultValue={item.title} data-docid={item.docid} onChange={titleHandler}/>
                    </td>
                    <td>
                      <Tooltip content='Doelgroep verwijderen' top='-60px'>
                        <DeleteOutlineOutlinedIcon className="table-icon" data-docid={item.docid} onClick={deleteTargetgroup}/>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
            </table>
            <AddItemRow content='Doelgroep toevoegen' onClick={addTargetgroup} />
          </div>
      </div>
  )
}

export default Targetgroups