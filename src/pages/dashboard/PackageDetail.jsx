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
import PackageDetailOutputs from "../../components/packages/PackageDetailOutputs"

const PackageDetail = () => {

    const id = Location()[4]
    const route = Location()[3]

    const packages = useFirestoreGeneral('packages', 'id', id)
    const compagny = useFirestoreGeneral('compagnies', 'id', route)

  return (
    <>
        {packages && packages.map(item => (
            <div className='package-builder-container package-detail-container'>
                <div id='package-builder-banner-container'>
                    <img src={item.banner} alt="" />
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
                        <h1>{item.title}</h1>
                    </div>
                    <div id='package-builder-description-container'>
                        <p>{item.description}</p>
                    </div>
                    <div>
                        <div className="package-builder-section-title-container">
                            <CorporateFareOutlinedIcon />
                            <h2>Aantal gecommiteerde organisaties</h2>
                        </div>
                        {packages && packages.map(item => (
                            <div key={item.id}>
                                <div className="package-detail-kpi-selector-container">
                                    <h3>Maximum</h3>
                                    <p>{item.maximum}</p>
                                </div>
                                <div className="package-detail-kpi-selector-container">
                                    <h3>Deadline</h3>
                                    <p>{item.deadline}</p>
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
                            <PackageDetailOutputs item={item}/>
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
        ))}
    </>
  )
}

export default PackageDetail