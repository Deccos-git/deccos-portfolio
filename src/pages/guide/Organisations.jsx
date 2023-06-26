import Topbar from "../../components/guide/Topbar"
import Navigation from "../../components/guide/Navigation"
import Instructions from "../../components/guide/Instructions"
import Settings from "../../components/guide/Settings"
import { useContext } from "react"
import { Data } from "../../state/Data";
import CompagnyPackage from "../../components/organisations/CompagnyPackage";
import PackageOutputsOrganisations from "../../components/organisations/PackageOutputsOrganisations"
import CompagnyPackageKPIs from "../../components/organisations/CompagnyPackageKPIs"
import { Settings as SettingsCompagny } from '../../state/Settings';

const Organisations = () => {
    const data = useContext(Data)
    const [settingsCompagny] = useContext(SettingsCompagny)

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

      const compagnyProjectMenu = () => {
        if(settingsCompagny[0]?.compagnyProject === 'project'){
          return 'Projecten'
        } else {
          return 'Organisaties'
        }  
    }

    const text = () => {
        return (
            <>
                <p>
                    <b>
                        Stel output doelen vast voor de portfolio {compagnyProject()}.
                    </b>
                </p>
            </>
        )
    }

    const settings = () => {
        return (
            <div className='table-container'>
                <table>
                <tr>
                    <th>{compagnyProjectTable()}</th>
                    <th>PAKKET</th>
                    <th>OUTPUT DOELEN</th>
                    <th>KPIS</th>
                </tr>
                    {data[0] && data[0].map(item => (
                    <tr key={item.ID}>
                        <td>
                           <p>{item.CommunityName}</p>
                        </td>
                        <td>
                            <CompagnyPackage item={item} />
                        </td>
                        <td>
                            <PackageOutputsOrganisations item={item} organisation={item.ID} />
                        </td>
                        <td>
                            <CompagnyPackageKPIs item={item} />
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
        prev="Pakketten"
        prevLink="packages"
        />
        <Topbar 
        title={compagnyProjectMenu()}
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

export default Organisations