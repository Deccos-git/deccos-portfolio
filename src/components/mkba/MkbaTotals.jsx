import { useFirestoreCompagnyID } from "../../firebase/useFirestoreDeccos"
import MkbaItemsTotal from "./MkbaItemsTotal"

const MkbaTotals = ({organisation, total, setTotal}) => {
    const MkbaSets = useFirestoreCompagnyID('SROISets', organisation.ID)

    // console.log(total)

    return (
     <div>
          {MkbaSets && MkbaSets.map(item => (
              <MkbaItemsTotal key={item.ID} mkbaSet={item} setTotal={setTotal} total={total}/>
          ))}
     </div>
              
    )
}

export default MkbaTotals