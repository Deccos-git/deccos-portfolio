import Location from "../../helpers/Location"
import { useFirestoreGeneral } from "../../firebase/useFirestore"
import OutputOutlinedIcon from '@mui/icons-material/OutputOutlined';
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';
import ThemeBuilderPairs from "../../components/themes/ThemeBuilderPairs"
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
import ThemeDetailOutputs from "../../components/themes/ThemeDetailOutputs"
import KpiMetaTheme from "../../components/kpis/KpiMetaTheme"
import { Settings as SettingsCompagny } from '../../state/Settings';
import { useContext } from "react"

const ThemeDetail = () => {
    const [settingsCompagny] = useContext(SettingsCompagny)

    const id = Location()[4]
    const route = Location()[3]

    const themes = useFirestoreGeneral('themes', 'id', id ? id : '')
    const compagny = useFirestoreGeneral('compagnies', 'id', route ? route : '')
    const themesKPIs = useFirestoreGeneral('themeKPIs', 'themeId', id)

    const compagnyProject = () => {
        if(settingsCompagny[0]?.compagnyProject === 'project'){
          return 'projecten'
        } else {
          return 'organisaties'
        }
      }

  return (
    <>
        {themes && themes.map(item => (
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
                            <div className="package-builder-section-title-icon-title-container">
                                <CorporateFareOutlinedIcon />
                                <h2>Gecommitteerde {compagnyProject()}</h2>
                            </div>
                        </div>
                        {themes && themes.map(item => (
                            <div key={item.id}>
                                <div className="package-detail-kpi-selector-container">
                                    <h3>Maximum</h3>
                                    <p>{item.maximum}</p>
                                </div>
                                <div className="package-detail-kpi-selector-container">
                                    <h3>Deadline</h3>
                                    <p>{item.deadline}</p>
                                </div>
                                <ThemeBuilderPairs item={item}/>
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className="package-builder-section-title-container">
                            <div className="package-builder-section-title-icon-title-container">
                                <OutputOutlinedIcon />
                                <h2>Outputs</h2>
                            </div>
                        </div>
                        {themes && themes.map(item => (
                            <ThemeDetailOutputs item={item}/>
                        ))}
                    </div>
                    <div>
                        <div className="package-builder-section-title-container">
                            <div className="package-builder-section-title-icon-title-container">
                                <LandscapeOutlinedIcon />
                                <h2>KPI's</h2>
                            </div>
                        </div>
                        {themesKPIs && themesKPIs.map(item => (
                            <div className="package-builder-kpi-container">
                                <KpiMetaTheme kpi={item.KPIId}/>   
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ))}
    </>
  )
}

export default ThemeDetail