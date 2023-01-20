import { useFirestoreGeneral } from "../../firebase/useFirestoreDeccos"
import Location from "../../helpers/Location";
import { useNavigate } from "react-router-dom";

const MkbaOrganisations = ({mkbaSet}) => {

    const id = Location()[3]

    const navigate = useNavigate()

    const organisations = useFirestoreGeneral('CompagnyMeta', 'CompagnyID', mkbaSet.CompagnyID)
  return (
    <>
        {organisations && organisations.map(item => (
            <p className='cursor' onClick={() => navigate(`/dashboard/organisation/${id}/${item.CompagnyID}`) } key={item.ID}>{item.CommunityName}</p>
        ))}
    </>
  )
}

export default MkbaOrganisations