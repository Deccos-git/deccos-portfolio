import { useFirestoreGeneral } from "../../firebase/useFirestore"
import BarChartSimple from "../graphs/BarChartSimple"
import KpiMeta from "./KpiMeta"

const KpiMetaPackage = ({kpi}) => {

    const kpis = useFirestoreGeneral('kpis', 'id', kpi)

  return (
    <>
        {kpis && kpis.map(item => (
            <div>
                <KpiMeta kpi={item} />
                <div className="graph-container">
                    <p>Gemeten welzijn</p>
                    <BarChartSimple kpi={item} />
                </div>
            </div>
            
        ))}
    </>
  )
}

export default KpiMetaPackage