import { useFirestoreGeneral } from "../../firebase/useFirestore"
import { useNavigate } from "react-router-dom";

const CompagnyCard = ({compagny}) => {

    const navigate = useNavigate()

    const compagnies = useFirestoreGeneral('compagnies', 'id', compagny)

  return (
      <>
        {compagnies && compagnies.map(item => (
            <div className='card'>
                <div className='sdg-card-meta-container'>
                    <img className='organisations-logo' src={item.logo} alt=""/>
                    <h3>{item.compagny}</h3>
                    <div className='card-button-container'>
                        <button onClick={() => navigate(`/dashboard/wall/${item.id}/`) }>Bekijk</button>
                    </div>
                </div>
            </div>
        ))}
      </>
  )
}

export default CompagnyCard