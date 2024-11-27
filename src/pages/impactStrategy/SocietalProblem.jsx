import { useFirestoreGeneral } from '../../firebase/useFirestore'
import Location from '../../helpers/Location'
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import { db } from "../../firebase/config"
import { doc, updateDoc} from "firebase/firestore"; 

const SocietalProblem = () => {

    // Hooks
    const client = Location()[3]
  
    // Firestore
    const societalProblem  = useFirestoreGeneral('societalProblem', 'companyId', client ? client : '')

    // OnChange handler for updating goal title
    const societalProblemHandler = async (e) => {
        const docid = e.target.dataset.docid
  
        await updateDoc(doc(db, "societalProblem", docid), {
            title: e.target.value,
        })
    }


  return (
    <div className='page-container'>
        <div className='page-top-container'>
        <div className='page-header-title-container'>
            <OutlinedFlagIcon/>
            <h1>Maatschappelijk probleem</h1>
        </div>
        </div>
        <div className='table-container section-container'>
        <table>
            <tr>
                <th>MAATSCHAPPELIJK PROBLEEM</th>
            </tr>
            {societalProblem && societalProblem.map(item => (
                <tr key={item.ID} >
                <td>
                    <textarea type="text" defaultValue={item.title} data-docid={item.docid} onChange={societalProblemHandler} placeholder="Noteer hier het maatschappelijke probleem" />
                </td>
                </tr>
            ))}
        </table>
        </div>
    </div>
  )
}

export default SocietalProblem