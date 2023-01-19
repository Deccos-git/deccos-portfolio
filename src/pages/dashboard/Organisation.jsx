import { useFirestoreGeneral } from "../../firebase/useFirestoreDeccos"
import { client, user } from "../../helpers/Client"
import ImpactSoftwareLink from "../../components/organisations/ImpactSoftwareLink"

const Organisation = () => {

    const id = client
    const compagnyId = user

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