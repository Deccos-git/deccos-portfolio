import { useFirestoreGeneral } from '../../firebase/useFirestore'
import Location from '../../helpers/Location'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Tooltip from "../../components/common/Tooltip";
import KpiMeta from '../../components/kpis/KpiMeta';

const Kpis = () => {

  const client = Location()[3]
  
  const kpis  = useFirestoreGeneral('kpis', 'compagny', client)

  return (
    <div className='page-container'>
        <div className='page-top-container'>
        <h1>Kpis</h1>
        </div>
         <div className='table-container'>
          <table>
            <tr>
                <th>KPI</th>
                <th>DETAILS</th>
            </tr>
              {kpis && kpis.map(item => (
                <tr key={item.ID} >
                  <td>
                      <KpiMeta kpi={item} />
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

export default Kpis