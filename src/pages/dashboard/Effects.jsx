import { useFirestoreGeneral } from '../../firebase/useFirestore'
import Location from '../../helpers/Location'
import { useNavigate } from "react-router-dom";
import Tooltip from "../../components/common/Tooltip";
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';

const Effects = () => {

  const client = Location()[3]
  const navigate = useNavigate()
  
  const effects  = useFirestoreGeneral('effects', 'compagny', client)

  return (
    <div className='page-container'>
        <div className='page-top-container'>
          <div className='page-header-title-container'>
            <CompareArrowsOutlinedIcon/>
            <h1>Effecten</h1>
          </div>
          <Tooltip content='Effecten aanpassen' top='-60px'>
            <AutoFixHighOutlinedIcon className='page-edit-icon' onClick={() => navigate(`/guide/effects/${client}`)}/>
          </Tooltip>
        </div>
         <div className='table-container'>
          <table>
            <tr>
                <th>EFFECTEN</th>
                <th>TERMIJN</th>
                {/* <th>DETAILS</th> */}
            </tr>
              {effects && effects.map(item => (
                <tr key={item.ID} >
                  <td>
                      <p>{item.title}</p>
                  </td>
                  <td><p>{item.term}</p></td>
                  {/* <td>
                    <Tooltip content='Details bekijken' top='-60px'>
                      <SearchOutlinedIcon className="table-icon"/>
                    </Tooltip>
                  </td> */}
                </tr>
              ))}
          </table>
        </div>
    </div>
  )
}

export default Effects