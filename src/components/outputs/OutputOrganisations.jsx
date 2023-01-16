import { useFirestoreGeneral } from "../../firebase/useFirestoreDeccos"
import { client } from "../../helpers/Client";
import { useNavigate } from "react-router-dom";

const Organisations = ({item}) => {

    const navigate = useNavigate()

    const organisations = useFirestoreGeneral('CompagnyMeta', 'CompagnyID', item.CompagnyID)

  return (
    <>
        {organisations && organisations.map(item => (
            <p className='cursor' onClick={() => navigate(`/dashboard/organisation/${client}/${item.CompagnyID}`) } key={item.ID}>{item.CommunityName}</p>
        ))}
    </>
  )
}

export default Organisations