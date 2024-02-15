import { useFirestoreGeneral } from '../../firebase/useFirestore'
import Location from '../../helpers/Location'
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import { db } from "../../firebase/config"
import { doc, updateDoc} from "firebase/firestore"; 

const Goal = () => {
    const client = Location()[3]
  
    const goals  = useFirestoreGeneral('goals', 'compagny', client)

    const goalHandler = async (e) => {
        const docid = e.target.dataset.docid
  
          await updateDoc(doc(db, "goals", docid), {
              title: e.target.value,
            })
      }
  
    return (
      <div className='page-container'>
          <div className='page-top-container'>
            <div className='page-header-title-container'>
                <OutlinedFlagIcon/>
                <h1>Impactdoel</h1>
            </div>
          </div>
           <div className='table-container section-container'>
            <table>
              <tr>
                  <th>MAATSCHAPPELIJK DOEL</th>
              </tr>
                {goals && goals.map(item => (
                  <tr key={item.ID} >
                    <td>
                        <textarea type="text" defaultValue={item.title} data-docid={item.docid} onChange={goalHandler} placeholder="Noteer hier je maatschappelijke doel" />
                    </td>
                  </tr>
                ))}
            </table>
          </div>
      </div>
    )
}

export default Goal