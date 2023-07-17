import { useFirestoreGeneral } from "../../firebase/useFirestore"
import BarChartSimple from "../graphs/BarChartSimple"
import KpiMeta from "./KpiMeta"

const KpiMetaTheme = ({kpi}) => {

    const kpis = useFirestoreGeneral('kpis', 'id', kpi ? kpi : '')


  return (
    <>
        {kpis && kpis.map(item => (
            <div>
                <KpiMeta kpi={item} />
                <div className="graph-container">
                    <BarChartSimple kpi={item} />
                </div>
            </div>
            
        ))}
    </>
  )
}

export default KpiMetaTheme