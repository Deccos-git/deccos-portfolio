import { useFirestoreOrganisations } from "../../firebase/useFirestoreDeccos"
import { useNavigate } from "react-router-dom";
import { Data } from "../../state/Data";
import { useContext } from "react";
import { client } from "../../helpers/Client";

const Organisations = () => {
  const data = useContext(Data)

    const navigate = useNavigate()

  return (
    <div className='page-container'>
        <div className='page-top-container'>
          <h1>Organisaties</h1>
        </div>
      <div className='card-container'>
        {data[0] && data[0].map(item => (
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