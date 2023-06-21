import { useFirestoreGeneral } from "../../firebase/useFirestore"

const PackageMeta = ({item}) => {

    const packages = useFirestoreGeneral('packages', 'id', item.packageId ? item.packageId : '' )

  return (
    <>
        {packages && packages.map(item => (
            <p key={item.id}>{item.titel}</p>
        ))}
    </>
  )
}

export default PackageMeta