import { useFirestoreGeneral } from "../../firebase/useFirestore"
import BarChartSimple from "../graphs/BarChartSimple"
import KpiMeta from "./KpiMeta"
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Tooltip from "../common/Tooltip"
import { doc, deleteDoc } from "firebase/firestore"
import { db } from "../../firebase/config"

const KpiMetaPackage = ({kpi, packageKpiDocid}) => {

    const kpis = useFirestoreGeneral('kpis', 'id', kpi)

    const deleteKPIOutput = async (e) => {

        await deleteDoc(doc(db, "packageKPIs", packageKpiDocid))
    }

  return (
    <>
        {kpis && kpis.map(item => (
            <div className="package-builder-kpi-container">
                <KpiMeta kpi={item} />
                <div className="graph-container">
                    <BarChartSimple kpi={item} />
                </div>
                <Tooltip content='Verwijderen' top='-60px'>
                    <DeleteOutlineOutlinedIcon  onClick={deleteKPIOutput} className='delete-icon'/>
                </Tooltip>
            </div>
            
        ))}
    </>
  )
}

export default KpiMetaPackage