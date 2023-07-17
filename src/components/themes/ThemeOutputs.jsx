import { useFirestoreGeneral } from '../../firebase/useFirestore'

const ThemeOutputs = ({id}) => {

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

export default ThemeOutputs