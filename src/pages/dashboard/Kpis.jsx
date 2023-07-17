import { useFirestoreGeneral } from '../../firebase/useFirestore'
import Location from '../../helpers/Location'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Tooltip from "../../components/common/Tooltip";
import KpiMeta from '../../components/kpis/KpiMeta';
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import { useNavigate } from "react-router-dom";

const Kpis = () => {

  const client = Location()[3]
  const navigate = useNavigate()
  
  const kpis  = useFirestoreGeneral('kpis', 'compagny', client)

  return (
    <div className='page-container'>
        <div className='page-top-container'>
          <div className='page-header-title-container'>
            <LandscapeOutlinedIcon/>
            <h1>KPI's</h1>
          </div>
          <Tooltip content={`KPI's aanpassen`} top='-60px'>
            <AutoFixHighOutlinedIcon className='page-edit-icon' onClick={() => navigate(`/guide/kpis/${client}`)}/>
          </Tooltip>
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
                      <SearchOutlinedIcon className="table-icon" onClick={() => navigate(`/dashboard/kpidetail/${client}/${item.id}`)} />
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