import Topbar from "../../components/guide/Topbar"
import Navigation from "../../components/guide/Navigation"
import Instructions from "../../components/guide/Instructions"
import Settings from "../../components/guide/Settings"
import Location from "../../helpers/Location"
import { db } from "../../firebase/config"
import { useFirestoreGeneral } from "../../firebase/useFirestore"
import { doc, setDoc, updateDoc, serverTimestamp, deleteDoc, arrayUnion } from "firebase/firestore"; 
import { useState } from "react"
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Tooltip from '../../components/common/Tooltip'
import { v4 as uuid } from 'uuid';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from "react-router-dom";
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import { useContext } from "react";
import { Settings as SettingsCompagny } from '../../state/Settings';

const Themes = () => {
    const [settingsCompagny] = useContext(SettingsCompagny)

    const [output, setOutput] = useState('')
    const [kpi, setKpi] = useState('')

    const id = Location()[3]
    const navigate = useNavigate()

    const themes = useFirestoreGeneral('themes', 'compagny', id)
    const kpis = useFirestoreGeneral('kpis', 'compagny', id)
    const themeCompagnyPairs = useFirestoreGeneral('themesCompagnyPairs', 'compagnyId', id)

    const compagnyProject = () => {
        if(settingsCompagny[0]?.compagnyProject === 'project'){
          return 'projecten'
        } else {
          return 'organisaties'
        }  
    }

    const text = () => {
        return (
            <>
                <p>
                    <b>
                     Stel thema's samen waar {compagnyProject()} zich aan kunnen verbinden.
                    </b>
                </p>
            </>
        )
    }

    const deletePackage = async (e) => {
        const docid = e.target.dataset.docid

        await deleteDoc(doc(db, "themes", docid));
    }

    const addPackage = async (e) => {

        await setDoc(doc(db, "themes", uuid()), {
            compagny: id,
            titel: '',
            description: '',
            createdAt: serverTimestamp(),
            id: uuid()
        });
    }

    const packageTitleHandler = async (e) => {
        const docid = e.target.dataset.docid
        const value = e.target.value

        await updateDoc(doc(db, "themes", docid), {
            title: value,
        })
    }

    const settings = () => {
        return (
            <div className='table-container'>
                <div className="add-icon-container">
                    <Tooltip content='Thema toevoegen' width='80%' left='30px' top='-5px'>
                        <AddCircleOutlineOutlinedIcon className="add-icon" onClick={addPackage} />
                    </Tooltip>
                </div>
                <table>
                <tr>
                    <th>THEMA</th>
                    <th>AANPASSEN</th>
                    <th>VERWIJDEREN</th>
                </tr>
                    {themes && themes.map(item => (
                    <tr key={item.id}>
                        <td>
                            <input type="text" defaultValue={item.title} data-docid={item.docid} onChange={packageTitleHandler}/>
                        </td>
                        <td>
                            <Tooltip content='Thema aanpassen' width='80%' left='30px' top='-5px'>
                                <SettingsSuggestOutlinedIcon className='table-icon' onClick={() => navigate(`/guide/themebuilder/${id}/${item.id}/${item.title}`)}/>
                            </Tooltip>
                        </td>
                        <td>
                            <Tooltip content='Thema verwijderen' width='80%' left='30px' top='-5px'>
                                <DeleteOutlineOutlinedIcon className="table-icon" data-docid={item.docid} onClick={deletePackage} />
                            </Tooltip>
                        </td>
                    </tr>
                    ))}
                </table>
            </div>
        )
    }

  return (
    <>
        <Topbar 
        title="Thema's" 
        />
        <Navigation
        prev="KPI's"
        prevLink="kpis"
        next={`Koppel ${compagnyProject()}`}
        nextLink="pairs"
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

export default Themes