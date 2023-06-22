import { useFirestoreGeneral } from "../../firebase/useFirestore"
import KpiMetaPackage from "./KpiMetaPackage"

const PackageKPI = ({item}) => {

    const packages = useFirestoreGeneral('packages', 'id', item.packageId)

  return (
    <>
        {packages && packages.map(item => (
            <>
            {item.kpis && item.kpis.map(item => (
            <KpiMetaPackage item={item} />
            ))}
            </>
        ))}
    </>
  )
}

export default PackageKPI