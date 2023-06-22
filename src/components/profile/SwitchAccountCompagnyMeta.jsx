import { useFirestoreGeneral } from '../../firebase/useFirestore'
import Location from "../../helpers/Location";

const SwitchAccountCompagnyMeta = ({compagny}) => {

    const route = Location()[3]

    const organisation = useFirestoreGeneral('compagnies', 'id', compagny)

  return (
    <>
        {organisation && organisation.map(item => (
            <option 
            key={item.id} 
            data-id={item.id} 
            value={item.id}
            style={{display: item.id === route ? 'none' : 'block'}}
            >
                {item.compagny}
            </option>
        ))}
    </>
  )
}

export default SwitchAccountCompagnyMeta