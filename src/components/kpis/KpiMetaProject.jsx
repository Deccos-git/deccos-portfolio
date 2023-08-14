import { useFirestoreGeneralThree } from "../../firebase/useFirestoreDeccos"

const KpiMetaProject = ({id, compagnyId}) => {


    console.log(id, compagnyId)

    const KPIs = useFirestoreGeneralThree('OutputEffects', 'ID', id, 'CompagnyID', compagnyId, 'KPI', 'true')

  return (
      <>
        {KPIs && KPIs.map(KPI => (
            <p key={KPI.ID}>{KPI.Effect}</p>
        ))}
    </>
  )
}

export default KpiMetaProject