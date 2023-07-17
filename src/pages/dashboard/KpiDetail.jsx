import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import KpiMeta from '../../components/kpis/KpiMeta';
import Location from '../../helpers/Location'
import Tooltip from "../../components/common/Tooltip";
import { useNavigate } from "react-router-dom";
import { useFirestoreId } from '../../firebase/useFirestore'

const KpiDetail = () => {

    const id = Location()[4]
    const client = Location()[3]
    const navigate = useNavigate()

    const kpis = useFirestoreId('kpis', id)

    console.log(kpis)

  return (
    <div className='page-container'>
    <div className='page-top-container'>
        <div className='page-header-title-container'>
            {kpis && kpis.map(item => (
                <KpiMeta kpi={item} />
            ))}
        </div>
        <Tooltip content={`KPI's aanpassen`} top='-60px'>
            <AutoFixHighOutlinedIcon className='page-edit-icon'  onClick={() => navigate(`/guide/kpis/${client}`)}/>
        </Tooltip>
    </div>
     <div className='table-container'>
        <div id='no-proof-container'>
            <p>Nog geen onderbouwing</p>
        </div>
    </div>
</div>
  )
}

export default KpiDetail