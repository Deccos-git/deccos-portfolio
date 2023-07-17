import Topbar from "../../components/guide/Topbar"
import Navigation from "../../components/guide/Navigation"
import Instructions from "../../components/guide/Instructions"
import Settings from "../../components/guide/Settings"
import { useContext } from "react"
import { Data } from "../../state/Data";
import CompagnyPackage from "../../components/organisations/CompagnyPackage";
import Location from "../../helpers/Location"
import { Settings as SettingsCompagny } from '../../state/Settings';
import { useFirestoreGeneral } from "../../firebase/useFirestore"

const Pairs = () => {
    const data = useContext(Data)
    const [settingsCompagny] = useContext(SettingsCompagny)

    const client = Location()[3]

    const themes = useFirestoreGeneral('themes', 'compagny', client)

    const compagnyProject = () => {
        if(settingsCompagny[0]?.compagnyProject === 'project'){
          return 'projecten'
        } else {
          return 'organisaties'
        }  
    }

    const compagnyProjectTable = () => {
        if(settingsCompagny[0]?.compagnyProject === 'project'){
          return 'PROJECT'
        } else {
          return 'ORGANISATIE'
        }
    }

    const text = () => {
        return (
            <>
                <p>
                    <b>
                        Koppel de portfolio {compagnyProject()} aan de thema's.
                    </b>
                </p>
            </>
        )
    }

    const themeHandler = (e) => {
    }

    const settings = () => {
        return (
            <div className='table-container'>
                <table>
                <tr>
                    <th>{compagnyProjectTable()}</th>
                    <th>THEMA</th>
                    {/* <th>OUTPUT DOELEN</th> */}
                </tr>
                    {data[0] && data[0].map(item => (
                    <tr key={item.ID}>
                        <td>
                           <p>{item.CommunityName}</p>
                        </td>
                        <td>
                            <select name="" id="" onChange={themeHandler}>
                                <option value="">-- Selecteer een thema --</option>
                                {}
                            </select>
                            <CompagnyPackage item={item} />
                        </td>
                        {/* <td>
                            <PackageOutputsOrganisations item={item} organisation={item.ID} />
                        </td> */}
                    </tr>
                    ))}
                </table>
            </div>
        )
    }

  return (
    <>
        <Topbar 
        title={`Koppel ${compagnyProject()}`}
        />
        <Navigation
        prev="Thema's"
        prevLink="packages"
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

export default Pairs