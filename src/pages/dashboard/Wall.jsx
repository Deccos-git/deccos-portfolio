import Location from "../../helpers/Location"
import { useFirestoreOrganisations} from "../../firebase/useFirestoreDeccos"
import Milestones from "../../components/Wall/Milestones"

const Wall = () => {

  const id = Location()[3]

  const organisations = useFirestoreOrganisations(id) 

  console.log(organisations)

  return (
    <div className='page-container'>
        <div className='page-top-container'>
          <h1>Mijlpalen</h1>
        </div>
      <div className='banner-container'>
        {organisations && organisations.map(item => (
          <Milestones item={item}/>
        ))}
      </div>
    </div>
  )
}

export default Wall