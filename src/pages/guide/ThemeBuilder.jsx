import Topbar from "../../components/guide/Topbar"
import Navigation from "../../components/guide/Navigation"
import Instructions from "../../components/guide/Instructions"
import Settings from "../../components/guide/Settings"
import Location from "../../helpers/Location"
import { db } from "../../firebase/config"
import { useFirestoreGeneral } from "../../firebase/useFirestore"
import { doc, updateDoc, setDoc, serverTimestamp, deleteDoc } from "firebase/firestore"; 
import { useState, useEffect, useContext } from "react"
import Tooltip from '../../components/common/Tooltip'
import saveFile from "../../components/core/savefile"
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import OutputOutlinedIcon from '@mui/icons-material/OutputOutlined';
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';
import ThemeBuilderOutputs from "../../components/themes/ThemeBuilderOutputs"
import ThemeBuilderPairs from "../../components/themes/ThemeBuilderPairs"
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
import { Settings as SettingsCompagny } from '../../state/Settings';
import { v4 as uuid } from 'uuid';
import ButtonClicked from "../../components/common/ButtonClicked"
import EffectMeta from "../../components/effects/EffectMeta"
import KpiMetaTheme from "../../components/kpis/KpiMetaTheme.jsx"
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const ThemeBuilder = () => {
    const [settingsCompagny] = useContext(SettingsCompagny)

    const [banner, setBanner] = useState('')
    const [showEditBanner, setShowEditBanner] = useState(false)
    const [docid, setDocid] = useState('')
    const [output, setOutput] = useState('')
    const [KPI, setKPI] = useState('')

    const id = Location()[4]
    const route = Location()[3]
    const themeTitle = Location()[5]
    const title = themeTitle.replace(/%20/g, " ")

    const compagnyProject = () => {
        if(settingsCompagny[0]?.compagnyProject === 'project'){
          return 'projecten'
        } else {
          return 'organisaties'
        }
      }

    const themes = useFirestoreGeneral('themes', 'id', id)
    const compagny = useFirestoreGeneral('compagnies', 'id', route)
    const outputs = useFirestoreGeneral('outputs', 'compagny', route)   
    const themesOutputs = useFirestoreGeneral('themesOutputs', 'themeId', id)
    const kpis  = useFirestoreGeneral('kpis', 'compagny', route)
    const themesKPIs = useFirestoreGeneral('themeKPIs', 'themeId', id)

    const text = () => {
        return(
            <>
                <p><b>Pas het thema '{title}' inhoudelijk en visueel aan.</b></p>
                <p>Koppel outputs en KPI's waar de portfolio {compagnyProject()} zich aan verbinden. </p>
                <p>Stel een totaal output doel vast waar de portfolio {compagnyProject()} naar toe werken. Stel deadlines in waarneer dit output doel behaald dient te zijn.</p>
            </>
        )
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

    const KPIhandler = (e) => {
        const value = e.target.options[e.target.selectedIndex].value

        setKPI(value)
    }

    const saveKPI = async (e) => {

        ButtonClicked(e, 'Toegevoegd')

        await setDoc(doc(db, "themeKPIs", uuid()), {
            KPIId: KPI,
            themeId: id,
            compagny: route,
            id: uuid(),
            createdAt: serverTimestamp(),
            deadline: '',
            position: kpis.length + 1
        });

    }

    const deleteKPIOutput = async (e) => {

        const docid = e.target.dataset.docid

        console.log(docid)

        await deleteDoc(doc(db, "themeKPIs", docid))
    }

    const settings = () => {
        return(
            <div id='package-builder-container'>
                <div id='package-builder-banner-container'>
                    <img src={banner} alt="" />
                    <div id='edit-banner-container'>
                        <input type="file" onChange={bannerHandler} style={{display: showEditBanner ? 'block' : 'none'}}/>
                        <Tooltip content="Pas de banner aan.">
                            <CreateOutlinedIcon className="table-icon" onClick={() => setShowEditBanner(!showEditBanner)} />
                        </Tooltip>
                    </div>
                </div>
                <div id="package-builder-content-container">
                    <div id='package-builder-logo-container'>
                        {compagny && compagny.map(item => (
                            <div key={item.id} id='package-builder-compagny-meta-container'>
                                <img src={item.logo} alt="" />
                                <h2>{item.compagny}</h2>
                            </div>    
                        ))}
                    </div>
                    <div id='package-builder-title-container'>
                        {themes && themes.map(item => (
                            <input type="text" data-docid={item.docid} defaultValue={item.title} onChange={titleHandler}/>
                        ))}
                    </div>
                    <div id='package-builder-description-container'>
                        {themes && themes.map(item => (
                            <textarea name="" id="" cols="30" rows="10" defaultValue={item.description} data-docid={item.docid} placeholder="Geef het thema een omschrijving" onChange={descriptionHandler}></textarea>
                        ))}
                    </div>
                    <div>
                        <div className="package-builder-section-title-container">
                            <div className="package-builder-section-title-icon-title-container">
                                <CorporateFareOutlinedIcon />
                                <h2>Gecommitteerde {compagnyProject()}</h2>
                            </div>
                            <p>Stel in hoeveel projecten maximaal op dit thema kunnen inschrijven en op welke datum de inschrijving voor dit thema sluit.</p>
                        </div>
                        {themes && themes.map(item => (
                            <div key={item.id}>
                                <div className="package-builder-kpi-selector-container">
                                    <h3>Maximum</h3>
                                    <input type="number" defaultValue={item.maximum} data-docid={item.docid} onChange={maximumHandler} />
                                </div>
                                <div className="package-builder-kpi-selector-container">
                                    <h3>Deadline</h3>
                                    <input type="date" defaultValue={item.deadline} data-docid={item.docid} onChange={deadlineHandler} />
                                </div>
                                <ThemeBuilderPairs item={item}/>
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className="package-builder-section-title-container">
                            <div className="package-builder-section-title-container">
                                <div className="package-builder-section-title-icon-title-container">
                                    <OutputOutlinedIcon />
                                    <h2>Outputs</h2>
                                </div>
                                <p>Selecteer outputs en stel per output in wat het totale doel is.</p>
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
                        {themes && themes.map(item => (
                            <ThemeBuilderOutputs item={item}/>
                        ))}
                    </div>
                    <div>
                        <div className="package-builder-section-title-container">
                            <div className="package-builder-section-title-icon-title-container">
                                <LandscapeOutlinedIcon />
                                <h2>KPI's</h2>
                            </div>
                            <p>Hieronder staan de KPI's die zijn verbonden aan dit thema. De onderzoeksresulaten van de gecommitteerde {compagnyProject()} worden hieraan gekoppeld ter onderbouwing van dit KPI.</p>
                        </div>
                        <div>
                            <select name="" id="" onChange={KPIhandler}>
                                <option value="">-- Selecter KPI --</option>
                                {kpis && kpis.map(item => (
                                    <option value={item.id}><EffectMeta effect={item.effectId}/></option>
                                ))}
                            </select>
                            <button onClick={saveKPI}>Toevoegen</button>
                        </div>
                        {themesKPIs && themesKPIs.map(item => (
                            <div key={item.id} className="package-builder-kpi-container">
                                <KpiMetaTheme kpi={item.KPIId} />
                                <Tooltip content='Verwijderen' top='-60px'>
                                    <DeleteOutlineOutlinedIcon data-docid={item.docid} onClick={deleteKPIOutput} className='delete-icon'/>
                                </Tooltip>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
  return (
    <>
        <Topbar 
        title={`Thema '${title}' aanpassen`}
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

export default ThemeBuilder