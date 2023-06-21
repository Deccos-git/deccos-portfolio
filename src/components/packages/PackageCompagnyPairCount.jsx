import { useFirestoreGeneral } from "../../firebase/useFirestore"

const PackageCompagnyPairCount = ({id}) => {

    const packageCompagnyPairs = useFirestoreGeneral('packageCompagnyPairs', 'packageId', id)
  return (
    <p>Aantal organisaties: <b>{packageCompagnyPairs.length}</b> </p>
  )
}

export default PackageCompagnyPairCount