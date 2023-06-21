import { useFirestoreGeneral } from '../../firebase/useFirestore'

const DashboardPairedKpis = ({kpiId}) => {

    const kpis = useFirestoreGeneral('kpis', 'id', kpiId)

    console.log(kpis)

  return (
    <>
        {kpis && kpis.map(kpi => (
            <div key={kpi.id}>
                {console.log(kpi)}
                {/* <p>{kpi.pairedKpis}</p> */}
            </div>
        ))}

    </>
  )
}

export default DashboardPairedKpis