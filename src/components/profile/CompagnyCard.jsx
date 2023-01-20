import { useFirestoreGeneral } from "../../firebase/useFirestore"
import Location from "../../helpers/Location";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CompagnyCard = ({compagny}) => {
    const [isCurrent, setIsCurrent] = useState(false)

    const id = Location()[3]

    useEffect(() => {
        if(id === compagny){
            setIsCurrent(true)
        }
    },[compagny])

    const navigate = useNavigate()

    const compagnies = useFirestoreGeneral('compagnies', 'id', compagny)

  return (
      <>
        {compagnies && compagnies.map(item => (
            <div className='card' style={{display: isCurrent ? 'none' : 'flex'}}>
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