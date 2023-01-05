import { useFirestoreOrganisations } from "../../firebase/useFirestoreDeccos"
import Location from "../../helpers/Location"
import { useNavigate } from "react-router-dom";

const Organisations = () => {

    const id = Location()[3]
    const navigate = useNavigate()

    const organisations = useFirestoreOrganisations(id) 

  return (
    <div className='page-container'>
        <div className='page-top-container'>
          <h1>Organisaties</h1>
        </div>
      <div className='card-container'>
        {organisations && organisations.map(item => (
          <div className='card' key={item.ID}>
            <img className='card-sdg-banner' src={item.ImpactBanner} alt="" />
            <div className='sdg-card-meta-container'>
                <img className='organisations-logo' src={item.Logo} alt=""/>
                <h3>{item.CommunityName}</h3>
                <div className='card-button-container'>
                    <button onClick={() => navigate(`/dashboard/organisation/${id}/${item.CompagnyID}`) }>Bekijk impact</button>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Organisations