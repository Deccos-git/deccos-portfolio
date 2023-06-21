import { useFirestoreGeneral } from '../../firebase/useFirestore'
import Location from '../../helpers/Location'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Tooltip from "../../components/common/Tooltip";

const Effects = () => {

  const client = Location()[3]
  
  const effects  = useFirestoreGeneral('effects', 'compagny', client)

  return (
    <div className='page-container'>
        <div className='page-top-container'>
        <h1>Effecten</h1>
        </div>
         <div className='table-container'>
          <table>
            <tr>
                <th>EFFECTEN</th>
                <th>TERMIJN</th>
                <th>DETAILS</th>
            </tr>
              {effects && effects.map(item => (
                <tr key={item.ID} >
                  <td>
                      <p>{item.title}</p>
                  </td>
                  <td><p>{item.term}</p></td>
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

export default Effects