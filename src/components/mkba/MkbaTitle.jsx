import { useFirestoreCompagnyID } from "../../firebase/useFirestoreDeccos"
import MkbaItemsTitle from "./MkbaItemsTitle"

const MkbaTitle = ({organisation}) => {

    const MkbaSets = useFirestoreCompagnyID('SROISets', organisation.ID)

  return (
   <div>
        {MkbaSets && MkbaSets.map(item => (
            <MkbaItemsTitle key={item.ID} mkbaSet={item}/>
        ))}
   </div>
            
  )
}

export default MkbaTitle