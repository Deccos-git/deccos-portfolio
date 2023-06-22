import Topbar from "../../components/guide/Topbar"
import Navigation from "../../components/guide/Navigation"
import Instructions from "../../components/guide/Instructions"
import Settings from "../../components/guide/Settings"
import Location from "../../helpers/Location"
import { db } from "../../firebase/config"
import { useFirestoreGeneral } from "../../firebase/useFirestore"
import { doc, updateDoc } from "firebase/firestore"; 
import { useState } from "react"
import Tooltip from '../../components/common/Tooltip'
import saveFile from "../../components/core/savefile"
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { useEffect } from "react"
import OutputOutlinedIcon from '@mui/icons-material/OutputOutlined';
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';
import PackageBuilderOutputs from "../../components/packages/PackageBuilderOutputs"
import PackageBuilderPairs from "../../components/packages/PackageBuilderPairs"
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
import PackageBuilderKPIs from "../../components/packages/PackageBuilderKPIs"

const PackageBuilder = () => {
    const [banner, setBanner] = useState('')
    const [showEditBanner, setShowEditBanner] = useState(false)
    const [docid, setDocid] = useState('')
    const [title, setTitle] = useState('')

    const id = Location()[4]
    const route = Location()[3]

    const packages = useFirestoreGeneral('packages', 'id', id)
    const compagny = useFirestoreGeneral('compagnies', 'id', route)

    console.log(packages)

    const text = () => {
        return(
            <p><b>Pas het thema '{title}' inhoudelijk en visueel aan.</b></p>
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
                            <CorporateFareOutlinedIcon />
                            <h2>Aantal gecommiteerde organisaties</h2>
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
                            <OutputOutlinedIcon />
                            <h2>Outputs</h2>
                        </div>
                        {packages && packages.map(item => (
                            <PackageBuilderOutputs item={item}/>
                        ))}
                    </div>
                    <div>
                        <div className="package-builder-section-title-container">
                            <LandscapeOutlinedIcon />
                            <h2>KPI's</h2>
                        </div>
                        {packages && packages.map(item => (
                            <PackageBuilderKPIs item={item}/>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
  return (
    <>
        <Navigation
        prev="Thema's"
        prevLink="packages"
        />
        <Topbar 
        title={`Thema '${title}' aanpassen`}
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