import Topbar from "../../components/guide/Topbar"
import Navigation from "../../components/guide/Navigation"
import Instructions from "../../components/guide/Instructions"
import Settings from "../../components/guide/Settings"
import Location from "../../helpers/Location"
import { db } from "../../firebase/config"
import { useFirestoreGeneral } from "../../firebase/useFirestore"
import { doc, setDoc, updateDoc, serverTimestamp, arrayUnion, arrayRemove } from "firebase/firestore"; 
import { useEffect, useState } from "react"

const Goal = () => {

    const id = Location()[3]

    const goals = useFirestoreGeneral('goals', 'compagny', id)

    const text = () => {
        return (
            <>
                <p>
                    <b>
                        Het maatschappelijk doel is de reden waarom je impact wil maken.
                    </b>
                </p>
            </>
        )
    }

    const goalHandler = async (e) => {
      const docid= e.target.dataset.docid

        await updateDoc(doc(db, "goals", docid), {
            title: e.target.value,
          })
    }

    const settings = () => {

        return (
            <div className='table-container'>
            <table>
              <tr>
                  <th>MAATSCHAPPELIJK DOEL</th>
              </tr>
                {goals && goals.map(item => (
                  <tr key={item.ID} >
                    <td>
                        <input type="text" defaultValue={item.goal} data-docid={item.docid} onChange={goalHandler} placeholder="Noteer hier je maatschappelijke doel" />
                    </td>
                  </tr>
                ))}
            </table>
          </div>
        )
    }

  return (
    <>
         <Navigation
        next="Activiteiten"
        nextLink="activities"
        prev="Welkom"
        prevLink="welcome"
        />
        <Topbar 
        title="Maatschappelijk doel" 
        />
         <Instructions
        text={text()}
        />
        <Settings
        settings={settings()}
        />
    </>
    
  )
}

export default Goal