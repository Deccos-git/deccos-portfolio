import { useFirestoreGeneral } from "../../firebase/useFirestore"
import PackageKPI from "../packages/PackageKPI"

const CompagnyPackageKPIs = ({item}) => {

    const packageCompagnyPairs = useFirestoreGeneral('packageCompagnyPairs', 'compagnyId', item.ID ? item.ID : '' )

  return (
     <>
        {packageCompagnyPairs && packageCompagnyPairs.map(item => (
            <PackageKPI item={item} />
        ))}
    </>
  )
}

export default CompagnyPackageKPIs