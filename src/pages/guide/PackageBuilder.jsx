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
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import { useNavigate } from "react-router-dom";
import KpiMeta from "../../components/kpis/KpiMeta"
import PackageOutputs from "../../components/packages/PackageOutputs"
import KpiMetaPackage from "../../components/packages/KpiMetaPackage";
import PackageCompagnyPairCount from "../../components/packages/PackageCompagnyPairCount";
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';

const PackageBuilder = () => {

    const text = () => {
        return(
            <p><b>Pas het thema inhoudelijk en visueel aan.</b></p>
        )
    }

    const settings = () => {
        <div id='package-builder-container'>
            <div id='package-builder-banner-container'>

            </div>

        </div>
    }
  return (
    <>
        <Navigation
        prev="Thema's"
        prevLink="packages"
        />
        <Topbar 
        title="Thema aanpassen" 
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