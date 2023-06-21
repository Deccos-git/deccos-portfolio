import { useFirestoreGeneral } from "../../firebase/useFirestore"

const KpiMetaDashboard = ({kpi, setKpiId}) => {

    const effects = useFirestoreGeneral('effects', 'id', kpi.effectId)

    const selectKpi = (e) => {
        setKpiId(e.target.dataset.id)
      }

  return (
    <>
        {effects && effects.map(item => (
            <p key={item.id} data-id={item.id} onClick={selectKpi}>{item.title}</p>
        ))}
    </>
  )
}

export default KpiMetaDashboard