import { useFirestoreGeneral } from "../../firebase/useFirestoreDeccos"

const OrganisationMeta = ({organisation}) => {
   
    const organisations = useFirestoreGeneral('CompagnyMeta', 'ID', organisation)
    
  return (
    <>
       {organisations && organisations.map(organisation => (
              <p key={organisation.id}>{organisation.CommunityName}</p>
         ))}
    </>
  )
}

export default OrganisationMeta