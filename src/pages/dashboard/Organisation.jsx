import { useFirestoreGeneral } from "../../firebase/useFirestoreDeccos"
import Location from "../../helpers/Location";
import ImpactSoftwareLink from "../../components/organisations/ImpactSoftwareLink"

const Organisation = () => {

    const compagnyId = Location()[3]

    const compagnies = useFirestoreGeneral('CompagnyMeta', 'CompagnyID', compagnyId ? compagnyId : '')


  return (
    <div className='page-container'>
        <div className='page-top-container'>
        {compagnies && compagnies.map(item => (
          <div key={item.CompagnyID}>
            <h1>{item.CommunityName}</h1>
          </div>
        ))}
        </div>
      <div className='banner-container'>
        {compagnies && compagnies.map(item => (
          <div key={item.CompagnyID}>
            <ImpactSoftwareLink compagny={item}/>
          </div>
        ))}
       
      </div>
    </div>
  )
}

export default Organisation