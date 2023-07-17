import { useFirestoreGeneral } from "../../firebase/useFirestore"
import KpiMeta from "../kpis/KpiMeta"

const KpiMetaTheme = ({item}) => {

    const kpis = useFirestoreGeneral('kpis', 'id', item)

  return (
    <>
        {kpis && kpis.map(item => (
          
            <KpiMeta kpi={item} />
        ))}
    </>
  )
}

export default KpiMetaTheme