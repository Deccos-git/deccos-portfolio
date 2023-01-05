import { useFirestoreCompagnyID} from "../../firebase/useFirestoreDeccos"

const Mkbas = ({organisation}) => {

    const mkbaSets = useFirestoreCompagnyID('SROISets', organisation.ID)
    
  return (
    <div>Mkbas</div>
  )
}

export default Mkbas