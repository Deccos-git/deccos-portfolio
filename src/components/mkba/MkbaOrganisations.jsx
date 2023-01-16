import { useFirestoreGeneral } from "../../firebase/useFirestoreDeccos"
import { client } from "../../helpers/Client";
import { useNavigate } from "react-router-dom";

const MkbaOrganisations = ({mkbaSet}) => {

    const navigate = useNavigate()

    const organisations = useFirestoreGeneral('CompagnyMeta', 'CompagnyID', mkbaSet.CompagnyID)
  return (
    <>
        {organisations && organisations.map(item => (
            <p className='cursor' onClick={() => navigate(`/dashboard/organisation/${client}/${item.CompagnyID}`) } key={item.ID}>{item.CommunityName}</p>
        ))}
    </>
  )
}

export default MkbaOrganisations