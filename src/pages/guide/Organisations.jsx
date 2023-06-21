import Topbar from "../../components/guide/Topbar"
import Navigation from "../../components/guide/Navigation"
import Instructions from "../../components/guide/Instructions"
import Settings from "../../components/guide/Settings"
import Location from "../../helpers/Location"
import { db } from "../../firebase/config"
import { useFirestoreGeneral } from "../../firebase/useFirestore"
import { doc, setDoc, updateDoc, serverTimestamp, deleteDoc, arrayUnion } from "firebase/firestore"; 
import { useState, useContext } from "react"
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Tooltip from '../../components/common/Tooltip'
import { v4 as uuid } from 'uuid';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import { useNavigate } from "react-router-dom";
import KpiMeta from "../../components/kpis/KpiMeta"
import PackageOutputs from "../../components/packages/PackageOutputs"
import KpiMetaPackage from "../../components/packages/KpiMetaPackage";
import PackageCompagnyPairCount from "../../components/packages/PackageCompagnyPairCount";
import { Data } from "../../state/Data";
import CompagnyPackage from "../../components/organisations/CompagnyPackage";
import PackageOutputsOrganisations from "../../components/organisations/PackageOutputsOrganisations"

const Organisations = () => {
    const data = useContext(Data)

    const text = () => {
        return (
            <>
                <p>
                    <b>
                        Stel output doelen vast voor de portfolio organisaties.
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
                    <th>ORGANISATIE</th>
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
        title="Organisaties" 
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