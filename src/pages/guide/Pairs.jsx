import Topbar from "../../components/guide/Topbar"
import Navigation from "../../components/guide/Navigation"
import Instructions from "../../components/guide/Instructions"
import Settings from "../../components/guide/Settings"
import { useContext, useState } from "react"
import { Data } from "../../state/Data";
import CompagnyTheme from "../../components/organisations/CompagnyTheme";
import Location from "../../helpers/Location"
import { Settings as SettingsCompagny } from '../../state/Settings';
import { useFirestoreGeneral } from "../../firebase/useFirestore"
import ButtonClicked from "../../components/common/ButtonClicked"
import { db } from "../../firebase/config"
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { v4 as uuid } from 'uuid';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

const Pairs = () => {
    const data = useContext(Data)
    const [settingsCompagny] = useContext(SettingsCompagny)

    const [theme, setTheme] = useState('')
    const [edit, setEdit] = useState(false)

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
        const value = e.target.options[e.target.selectedIndex].value

        setTheme(value)
    }

    const saveTheme = async (e) => {

        ButtonClicked(e, 'Opgeslagen')

        const compagny = e.target.dataset.compagny

        await setDoc(doc(db, "themeCompagnyPairs", uuid()), {
            themeId: theme,
            compagnyId: compagny,
            compagny: client,
            createdAt: serverTimestamp(),
            id: uuid()
        });


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
                            <div style={{display: edit === true ? 'block' : 'none'}}>
                                <select name="" id="" onChange={themeHandler}>
                                    <option value="">-- Selecteer een thema --</option>
                                    {themes && themes.map(theme => (
                                        <option value={theme.id}>{theme.title}</option>
                                    ))}
                                </select>
                                <button data-compagny={item.ID} onClick={saveTheme}>Opslaan</button>
                            </div>
                            <CreateOutlinedIcon className="delete-icon" onClick={() => setEdit(!edit)} />
                            <CompagnyTheme item={item} />
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
        prevLink="themes"
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