import Location from "../../helpers/Location"
import { useFirestoreGeneral } from "../../firebase/useFirestore"
import OutputOutlinedIcon from '@mui/icons-material/OutputOutlined';
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';
import ThemeBuilderPairs from "../../components/themes/ThemeBuilderPairs"
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
import ThemeDetailOutputs from "../../components/themes/ThemeDetailOutputs"
import EffectMeta from "../../components/effects/EffectMeta"
import { Settings as SettingsCompagny } from '../../state/Settings';
import { db } from "../../firebase/config"
import { doc, updateDoc, setDoc, serverTimestamp, deleteDoc } from "firebase/firestore"; 
import { useState, useEffect, useContext } from "react"
import Tooltip from '../../components/common/Tooltip'
import saveFile from "../../components/core/savefile"
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { v4 as uuid } from 'uuid';
import ButtonClicked from "../../components/common/ButtonClicked"
import OutputMeta from "../../components/outputs/OutputMeta"
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Data } from "../../state/Data";

const ThemeDetail = () => {
    // Context
    const [settingsCompagny] = useContext(SettingsCompagny)
    const data = useContext(Data)

    // State
    const [banner, setBanner] = useState('')
    const [showEditBanner, setShowEditBanner] = useState(false)
    const [docid, setDocid] = useState('')
    const [output, setOutput] = useState('')
    const [effect, setEffect] = useState('')
    const [organisation, setOrganisation] = useState('')

    // Hooks
    const id = Location()[4]
    const route = Location()[3]

    // Firestore
    const themes = useFirestoreGeneral('themes', 'id', id ? id : '')
    const compagny = useFirestoreGeneral('compagnies', 'id', route ? route : '')
    const outputs = useFirestoreGeneral('outputs', 'compagny', route ? route : '')    
    const themesOutputs = useFirestoreGeneral('themeOutputs', 'themeId', id ? id : '')
    const themesEffects = useFirestoreGeneral('themeEffects', 'themeId', id ? id : '')
    const effects  = useFirestoreGeneral('effects', 'compagny', route ? route : '')
    const themeCompagnyPairs = useFirestoreGeneral('themeCompagnyPairs', 'themeId', id ? id : '')
    const allOrganisations = data[0]

    const compagnyProject = () => {
        if(settingsCompagny[0]?.compagnyProject === 'project'){
          return 'projecten'
        } else {
          return 'organisaties'
        }
      }

        // Set docid, title, description and banner of package
    useEffect(() => {
        themes && themes.map(item => {
            setDocid(item.docid)
            setBanner(item.banner)
        })
    }, [themes])

    const bannerHandler = (e) => {
        saveFile(e, setBanner)
    }
    
    // Save banner to firebase
    const saveBanner = async () => {
        await updateDoc(doc(db, "themes", docid), {
            banner: banner
        });
    }

    useEffect(() => {
        saveBanner()
    }, [banner])

    const titleHandler = async (e) => {
        const value = e.target.value
        const docId = e.target.docid

        await updateDoc(doc(db, "themes", docId), {
            title: value
        });
    }

    const descriptionHandler = async (e) => {
        const docid = e.target.dataset.docid
        const value = e.target.value

        await updateDoc(doc(db, "themes", docid), {
            description: value,
        })

        console.log('description saved')
    }

    const maximumHandler = async (e) => {
        const value = e.target.value
        const docid = e.target.dataset.docid

        await updateDoc(doc(db, "themes", docid), {
            maximum: value
        });
    }

    const deadlineHandler = async (e) => {
        const value = e.target.value
        const docid = e.target.dataset.docid

        await updateDoc(doc(db, "themes", docid), {
            deadline: value
        });
    }

    const outputHandler = (e) => {
        const value = e.target.options[e.target.selectedIndex].value

        setOutput(value)
    }

    const saveOutput = async (e) => {

        ButtonClicked(e, 'Toegevoegd')

        await setDoc(doc(db, "themeOutputs", uuid()), {
            outputId: output,
            themeId: id,
            compagny: route,
            id: uuid(),
            createdAt: serverTimestamp(),
            deadline: '',
            position: themesOutputs.length + 1
        });

    }

    const themeOutputGoalHandler = async (e) => {

        const docid = e.target.dataset.docid
        const value = e.target.value

        await updateDoc(doc(db, "themeOutputs", docid), {
            goal: value
        });

    }

    const deleteThemeOutput = async (e) => {

        const docid = e.target.dataset.docid

        await deleteDoc(doc(db, "themeOutputs", docid))
    }

    const themeEffecthandler = (e) => {
        const value = e.target.options[e.target.selectedIndex].value

        setEffect(value)
    }

    const saveThemeEffect = async (e) => {

        ButtonClicked(e, 'Toegevoegd')

        await setDoc(doc(db, "themeEffects", uuid()), {
            effectId: effect,
            themeId: id,
            compagny: route,
            id: uuid(),
            createdAt: serverTimestamp(),
            deadline: '',
            position: themesEffects.length + 1
        });

    }

    const deleteThemeEffect = async (e) => {

        const docid = e.target.dataset.docid

        await deleteDoc(doc(db, "themeEffects", docid))
    }

    const deleteThemeCompagnyPair = async (e) => {

        const docid = e.target.dataset.docid

        await deleteDoc(doc(db, "themeCompagnyPairs", docid))
    }

    const organisationHandler = (e) => {
        const value = e.target.options[e.target.selectedIndex].value

        setOrganisation(value)
    }

    const addOrganisation = async () => {

        await setDoc(doc(db, "themeCompagnyPairs", uuid()), {
            themeId: id,
            compagnyId: organisation,
            compagny: route,
            id: uuid(),
            createdAt: serverTimestamp(),
            approved: false
        });

    }

  return (
    <div id='package-builder-container'>
        <div id="package-builder-content-container">
            <div id='package-builder-title-container'>
                {themes && themes.map(item => (
                    <input type="text" data-docid={item.docid} defaultValue={item.title} onChange={titleHandler}/>
                ))}
            </div>
            <div className="theme-builder-section-container">
                <div className="package-builder-section-title-container">
                    <div className="package-builder-section-title-container">
                        <div className="package-builder-section-title-icon-title-container">
                            <OutputOutlinedIcon />
                            <h2>Outputs</h2>
                        </div>
                        <p>Selecteer outputs en stel per output in wat de KPI is. De kwantatieve resultaten van de gecommiteerde organisaties worden hieraan gekoppeld.</p>
                    </div>
                    <div>
                        <select name="" id="" onChange={outputHandler}>
                            <option value="">-- Selecteer output --</option>
                            {outputs && outputs.map(item => (
                                <option value={item.id}>{item.title}</option>
                            ))}
                        </select>
                        <button onClick={saveOutput}>Toevoegen</button>
                    </div>
                
                </div>
                <table>
                    <tr>
                        <th>OUTPUT</th>
                        <th>KPI</th>
                        <th>VERWIJDEREN</th>
                    </tr>
                    {themesOutputs && themesOutputs.map(item => (
                        <tr key={item.id}>
                            <td>
                                <OutputMeta output={item.outputId}/>
                            </td>
                            <td><input type="number" defaultValue={item.goal} data-docid={item.docid} onChange={themeOutputGoalHandler}/></td>
                            <td>
                                <Tooltip content='Effect verwijderen' width='80%' left='30px' top='-5px'>
                                    <DeleteOutlineOutlinedIcon data-docid={item.docid} onClick={deleteThemeOutput} className='delete-icon'/>
                                </Tooltip>
                            </td>
                        </tr>
                    ))}
                </table>         
            </div>
            {/* <div className="theme-builder-section-container">
                <div className="package-builder-section-title-container">
                    <div className="package-builder-section-title-icon-title-container">
                        <LandscapeOutlinedIcon />
                        <h2>Effecten</h2>
                    </div>
                    <p>Hieronder staan de effecten die zijn verbonden aan dit thema. De onderzoeksresulaten van de gecommitteerde {compagnyProject()} worden hieraan gekoppeld ter onderbouwing van dit effect.</p>
                </div>
                <div>
                    <select name="" id="" onChange={themeEffecthandler}>
                        <option value="">-- Selecter effect --</option>
                        {effects && effects.map(item => (
                            <option value={item.id}>{item.title}</option>
                        ))}
                    </select>
                    <button onClick={saveThemeEffect}>Toevoegen</button>
                </div>
                <table>
                    <tr>
                        <th>EFFECT</th>
                        <th>VERWIJDEREN</th>
                    </tr>
                    {themesEffects && themesEffects.map(item => (
                        <tr key={item.id}>
                            <td>
                                <EffectMeta effect={item.effectId}/>
                            </td>
                            <td>
                                <Tooltip content='Effect verwijderen' width='80%' left='30px' top='-5px'>
                                    <DeleteOutlineOutlinedIcon data-docid={item.docid} onClick={deleteThemeEffect} className='delete-icon'/>
                                </Tooltip>
                            </td>
                        </tr>
                    ))}
                </table>         
            </div> */}
        </div>
    </div>
  )
}

export default ThemeDetail