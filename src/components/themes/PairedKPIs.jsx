import { useFirestoreGeneralTwo } from "../../firebase/useFirestoreDeccos"
import KPIMetaProject from "../kpis/KpiMetaProject"

const PairedKPIs = ({theme, compagnyId}) => {

    const pairedCompagnyKPIs = useFirestoreGeneralTwo('PairedKPIs', 'ThemeId', theme, 'CompagnyID', compagnyId)


  return (
    <>
        {pairedCompagnyKPIs && pairedCompagnyKPIs.map(item => (
            <div key={item.id}>
                <KPIMetaProject id={item.Kpi} compagnyId={compagnyId}/>
            </div>
        ))}
    </>
  )
}

export default PairedKPIs