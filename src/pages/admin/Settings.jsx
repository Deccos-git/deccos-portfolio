import Location from "../../helpers/Location";
import { useFirestoreGeneral } from '../../firebase/useFirestore'
import { doc, setDoc, updateDoc, serverTimestamp, arrayUnion, arrayRemove } from "firebase/firestore"; 
import { db } from '../../firebase/config';
import { useEffect, useState } from "react";

const Settings = () => {
  // State
  const [primaryColor, setPrimaryColor] = useState('')
  const [secondaryColor, setSecondaryColor] = useState('')
  const [tertiaryColor, setTertiaryColor] = useState('')
  const [docid, setDocid] = useState('')

  // Hooks
  const client = Location()[3]

  // Firestore
  const settings = useFirestoreGeneral('settings', 'companyId', client ? client : '')

  // Set the docid in state
  useEffect(() => {
    if(settings) {
      settings.map(item => {
        setDocid(item.docid)
      })
    }
  }, [settings])

  // Handle the project/organisation terminology
  const projectOrganisationHandler = async (e) => {

    const value = e.target.options[e.target.selectedIndex].value 
    const docid = e.target.dataset.docid

    await updateDoc(doc(db, "settings", docid), {
      compagnyProject: value
    })

  }

  // Set the colors in state
  useEffect(() => {
    if(settings) {
      settings.map(item => {
        setPrimaryColor(item.primaryColor)
        setSecondaryColor(item.secondaryColor)
        setTertiaryColor(item.tertiaryColor)
      })
    }
  }, [settings])

  // Handle the primary color
  const primaryColorHandler = async (e) => {
    const value = e.target.value

    await updateDoc(doc(db, "settings", docid), {
      primaryColor: value
    })
  }

  // Handle the secondary color
  const secondaryColorHandler = async (e) => {
    const value = e.target.value

    await updateDoc(doc(db, "settings", docid), {
      secondaryColor: value
    })
  }

  // Handle the tertiary color
  const tertiaryColorHandler = async (e) => {
    const value = e.target.value

    await updateDoc(doc(db, "settings", docid), {
      tertiaryColor: value
    })
  }

  console.log(primaryColor, secondaryColor, tertiaryColor)

  return (
    <div className='page-container'>
      <div className='page-top-container'>
          <h1>Instellingen</h1>
      </div>
     
        <div className='settings-container'>

          {/* Terminology project/organisation */}
          <div>
            <h2>Terminologie</h2>
            <p>Pas de terminologie van je omgeving aan.</p>
            {settings && settings.map(item => (
              <select key={item.id} name="" id="" data-docid={item.docid} defaultValue={item.compagnyProject} onChange={projectOrganisationHandler}>
                  <option value="">-- Selecteer een terminologie --</option>
                  <option value="compagny" >Organisaties</option>
                  <option value="project">Projecten</option>
              </select>
            ))}
          </div>

            {/* Housstyle */}
            <div>
              <h2>Huisstijl</h2>
              <p>Pas de huisstijl aan.</p>

              <div id='housestyle-colors-container'>
                <div>
                  <h3>Primair</h3>
                  <input type="color" value={primaryColor} onChange={primaryColorHandler} name="" id=""/>
                </div>

                <div>
                  <h3>Secundair</h3>
                  <input type="color" value={secondaryColor} onChange={secondaryColorHandler} name="" id=""/>
                </div>

                <div>
                  <h3>Tertiair</h3>
                  <input type="color" value={tertiaryColor} onChange={tertiaryColorHandler} name="" id=""/>
                </div>
               
              </div>

            </div>
        </div>
    </div> 
  )
}

export default Settings