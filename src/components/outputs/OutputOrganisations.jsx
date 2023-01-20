import { useFirestoreGeneral } from "../../firebase/useFirestoreDeccos"
import Location from "../../helpers/Location";
import { useNavigate } from "react-router-dom";

const Organisations = ({item}) => {

    const id = Location()[3]

    const navigate = useNavigate()

    const organisations = useFirestoreGeneral('CompagnyMeta', 'CompagnyID', item.CompagnyID)

  return (
    <>
        {organisations && organisations.map(item => (
            <p className='cursor' onClick={() => navigate(`/dashboard/organisation/${id}/${item.CompagnyID}`) } key={item.ID}>{item.CommunityName}</p>
        ))}
    </>
  )
}

export default Organisations