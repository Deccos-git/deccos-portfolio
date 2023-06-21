import { useFirestoreGeneral } from "../../firebase/useFirestore"

const KpiMeta = ({kpi}) => {

    const effects = useFirestoreGeneral('effects', 'id', kpi.effectId)

  return (
    <>
        {effects && effects.map(item => (
            <p key={item.id}>{item.title}</p>
        ))}
    </>
  )
}

export default KpiMeta