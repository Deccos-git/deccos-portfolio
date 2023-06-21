import { useFirestoreGeneral } from '../../firebase/useFirestore'
import Location from '../../helpers/Location'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Tooltip from "../../components/common/Tooltip";

const Activities = () => {
    const client = Location()[3]
  
    const activities  = useFirestoreGeneral('activities', 'compagny', client)
  
    return (
      <div className='page-container'>
          <div className='page-top-container'>
          <h1>Activiteiten</h1>
          </div>
           <div className='table-container'>
            <table>
              <tr>
                  <th>ACTIVITEITEN</th>
                  <th>DETAILS</th>
              </tr>
                {activities && activities.map(item => (
                  <tr key={item.ID} >
                    <td>
                        <p>{item.title}</p>
                    </td>
                    <td>
                      <Tooltip content='Details bekijken' top='-60px'>
                        <SearchOutlinedIcon className="table-icon"/>
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