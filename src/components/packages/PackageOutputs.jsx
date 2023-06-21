import { useFirestoreGeneral } from '../../firebase/useFirestore'

const PackageOutputs = ({id}) => {

    const packageOutputs = useFirestoreGeneral('packageOutputs', 'packageId', id)

  return (
    <ul>
        {packageOutputs && packageOutputs.map((item) => (
            <li key={item.id}>
                {item.title}
            </li>
        ))}
    </ul>
  )
}

export default PackageOutputs