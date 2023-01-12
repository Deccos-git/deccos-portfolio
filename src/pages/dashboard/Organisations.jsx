import { useFirestoreOrganisations } from "../../firebase/useFirestoreDeccos"
import { useNavigate } from "react-router-dom";
import { Orgs } from "../../state/Organisations";
import { useContext } from "react";
import { client } from "../../helpers/Client";

const Organisations = () => {
  const organisations = useContext(Orgs)

    const navigate = useNavigate()

  return (
    <div className='page-container'>
        <div className='page-top-container'>
          <h1>Organisaties</h1>
        </div>
      <div className='card-container'>
        {organisations[0] && organisations[0].map(item => (
          <div className='card' key={item.ID}>
            <img className='card-sdg-banner' src={item.ImpactBanner} alt="" />
            <div className='sdg-card-meta-container'>
                <img className='organisations-logo' src={item.Logo} alt=""/>
                <h3>{item.CommunityName}</h3>
                <div className='card-button-container'>
                    <button onClick={() => navigate(`/dashboard/organisation/${client}/${item.CompagnyID}`) }>Bekijk impact</button>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Organisations