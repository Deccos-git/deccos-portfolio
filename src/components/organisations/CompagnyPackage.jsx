import { useFirestoreGeneral } from "../../firebase/useFirestore"
import PackageMeta from "../../components/packages/PackageMeta";

const CompagnyPackage = ({item}) => {

    const packageCompagnyPairs = useFirestoreGeneral('packageCompagnyPairs', 'compagnyId', item.ID ? item.ID : '' )

  return (
    <>
        {packageCompagnyPairs && packageCompagnyPairs.map(item => (
            <PackageMeta item={item} />
        ))}
    </>
  )
}

export default CompagnyPackage