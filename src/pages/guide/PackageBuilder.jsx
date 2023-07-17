import Topbar from "../../components/guide/Topbar"
import Navigation from "../../components/guide/Navigation"
import Instructions from "../../components/guide/Instructions"
import Settings from "../../components/guide/Settings"
import Location from "../../helpers/Location"
import { db } from "../../firebase/config"
import { useFirestoreGeneral } from "../../firebase/useFirestore"
import { doc, updateDoc, setDoc, serverTimestamp } from "firebase/firestore"; 
import { useState } from "react"
import Tooltip from '../../components/common/Tooltip'
import saveFile from "../../components/core/savefile"
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { useEffect, useContext } from "react"
import OutputOutlinedIcon from '@mui/icons-material/OutputOutlined';
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';
import PackageBuilderOutputs from "../../components/packages/PackageBuilderOutputs"
import PackageBuilderPairs from "../../components/packages/PackageBuilderPairs"
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
import { Settings as SettingsCompagny } from '../../state/Settings';
import { v4 as uuid } from 'uuid';
import ButtonClicked from "../../components/common/ButtonClicked"
import EffectMeta from "../../components/effects/EffectMeta"
import KpiMetaPackage from "../../components/kpis/KpiMetaPackage"

const PackageBuilder = () => {
    const [settingsCompagny] = useContext(SettingsCompagny)

    const [banner, setBanner] = useState('')
    const [showEditBanner, setShowEditBanner] = useState(false)
    const [docid, setDocid] = useState('')
    const [title, setTitle] = useState('')
    const [output, setOutput] = useState('')
    const [KPI, setKPI] = useState('')

    const id = Location()[4]
    const route = Location()[3]
    const compagnyProject = () => {
        if(settingsCompagny[0]?.compagnyProject === 'project'){
          return 'projecten'
        } else {
          return 'organisaties'
        }
      }

    const packages = useFirestoreGeneral('packages', 'id', id)
    const compagny = useFirestoreGeneral('compagnies', 'id', route)
    const outputs = useFirestoreGeneral('outputs', 'compagny', route)   
    const packagesOutputs = useFirestoreGeneral('packageOutputs', 'packageId', id)
    const kpis  = useFirestoreGeneral('kpis', 'compagny', route)
    const packagesKPIs = useFirestoreGeneral('packageKPIs', 'packageId', id)

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
        packages && packages.map(item => {
            setDocid(item.docid)
            setTitle(item.title)
            setBanner(item.banner)
        })
    }, [packages])

    const bannerHandler = (e) => {
        saveFile(e, setBanner)
    }
    
    // Save banner to firebase
    const saveBanner = async () => {
        await updateDoc(doc(db, "packages", docid), {
            banner: banner
        });
    }

    useEffect(() => {
        saveBanner()
    }, [banner])

    const titleHandler = async (e) => {
        const value = e.target.value
        const docId = e.target.docid

        await updateDoc(doc(db, "packages", docId), {
            title: value
        });
    }

    const descriptionHandler = async (e) => {
        const docid = e.target.dataset.docid
        const value = e.target.value

        await updateDoc(doc(db, "packages", docid), {
            description: value,
        })
    }

    const maximumHandler = async (e) => {
        const value = e.target.value
        const docid = e.target.dataset.docid

        await updateDoc(doc(db, "packages", docid), {
            maximum: value
        });
    }

    const deadlineHandler = async (e) => {
        const value = e.target.value
        const docid = e.target.dataset.docid

        await updateDoc(doc(db, "packages", docid), {
            deadline: value
        });
    }

    const outputHandler = (e) => {
        const value = e.target.options[e.target.selectedIndex].value

        setOutput(value)
    }

    const saveOutput = async (e) => {

        ButtonClicked(e, 'Toegevoegd')

        await setDoc(doc(db, "packageOutputs", uuid()), {
            outputId: output,
            packageId: id,
            compagny: route,
            id: uuid(),
            createdAt: serverTimestamp(),
            deadline: '',
            position: packagesOutputs.length + 1
        });

    }

    const KPIhandler = (e) => {
        const value = e.target.options[e.target.selectedIndex].value

        setKPI(value)
    }

    const saveKPI = async (e) => {

        ButtonClicked(e, 'Toegevoegd')

        await setDoc(doc(db, "packageKPIs", uuid()), {
            KPIId: KPI,
            packageId: id,
            compagny: route,
            id: uuid(),
            createdAt: serverTimestamp(),
            deadline: '',
            position: kpis.length + 1
        });

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
                        {packages && packages.map(item => (
                            <input type="text" data-docid={item.docid} defaultValue={item.title} onChange={titleHandler}/>
                        ))}
                    </div>
                    <div id='package-builder-description-container'>
                        {packages && packages.map(item => (
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
                        {packages && packages.map(item => (
                            <div key={item.id}>
                                <div className="package-builder-kpi-selector-container">
                                    <h3>Maximum</h3>
                                    <input type="number" defaultValue={item.maximum} data-docid={item.docid} onChange={maximumHandler} />
                                </div>
                                <div className="package-builder-kpi-selector-container">
                                    <h3>Deadline</h3>
                                    <input type="date" defaultValue={item.deadline} data-docid={item.docid} onChange={deadlineHandler} />
                                </div>
                                <PackageBuilderPairs item={item}/>
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
                        {packages && packages.map(item => (
                            <PackageBuilderOutputs item={item}/>
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
                        {packagesKPIs && packagesKPIs.map(item => (
                            <KpiMetaPackage kpi={item.KPIId} packageKpiDocid={item.docid}/>
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

export default PackageBuilder