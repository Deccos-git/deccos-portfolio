import Location from "../../helpers/Location";
import { useFirestoreGeneral } from '../../firebase/useFirestore'

const Settings = () => {

  const client = Location()[3]

  const settings = useFirestoreGeneral('settings', 'compagnyId', client)

  console.log(settings)

  const projectOrganisationHandler = (e) => {

    const value = e.target.options[e.target.selectedIndex].value 

  }


  return (
    <div className='page-container'>
      <div className='page-top-container'>
          <h1>Instellingen</h1>
      </div>
      <div className='settings-container'>
        <h2>Terminologie</h2>
        <p>Pas de terminologie van je omgeving aan.</p>
        <select name="" id="" onChange={projectOrganisationHandler}>
            <option value="">Organisaties</option>
            <option value="">Projecten</option>
        </select>
      </div>
    </div>
  )
}

export default Settings