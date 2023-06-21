import { useFirestoreGeneral } from '../../firebase/useFirestore'
import Location from '../../helpers/Location'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Tooltip from "../../components/common/Tooltip";

const Outputs = () => {
    const client = Location()[3]
  
    const outputs  = useFirestoreGeneral('outputs', 'compagny', client)
  
    return (
      <div className='page-container'>
          <div className='page-top-container'>
          <h1>Outputs</h1>
          </div>
           <div className='table-container'>
            <table>
              <tr>
                  <th>OUTPUTS</th>
                  <th>DETAILS</th>
              </tr>
                {outputs && outputs.map(item => (
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

export default Outputs