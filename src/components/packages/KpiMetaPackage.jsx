import { useFirestoreGeneral } from "../../firebase/useFirestore"
import KpiMeta from "../kpis/KpiMeta"

const KpiMetaPackage = ({item}) => {

    const kpis = useFirestoreGeneral('kpis', 'id', item)

  return (
    <>
        {kpis && kpis.map(item => (
          
            <KpiMeta kpi={item} />
        ))}
    </>
  )
}

export default KpiMetaPackage