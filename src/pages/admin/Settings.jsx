import Location from "../../helpers/Location";
import { useFirestoreGeneral } from '../../firebase/useFirestore'
import { doc, setDoc, updateDoc, serverTimestamp, arrayUnion, arrayRemove } from "firebase/firestore"; 
import { db } from '../../firebase/config';

const Settings = () => {

  const client = Location()[3]

  const settings = useFirestoreGeneral('settings', 'compagnyId', client)

  const projectOrganisationHandler = async (e) => {

    const value = e.target.options[e.target.selectedIndex].value 
    const docid = e.target.dataset.docid

    await updateDoc(doc(db, "settings", docid), {
      compagnyProject: value
    })

  }


  return (
    <div className='page-container'>
      <div className='page-top-container'>
          <h1>Instellingen</h1>
      </div>
     
        <div className='settings-container'>
          <h2>Terminologie</h2>
          <p>Pas de terminologie van je omgeving aan.</p>
          {settings && settings.map(item => (
            <select name="" id="" data-docid={item.docid} defaultValue={item.compagnyProject} onChange={projectOrganisationHandler}>
                <option value="">-- Selecteer een terminologie --</option>
                <option value="compagny" >Organisaties</option>
                <option value="project">Projecten</option>
            </select>
          ))}
        </div>
    </div> 
  )
}

export default Settings