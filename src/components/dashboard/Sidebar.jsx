import { NavLink } from "react-router-dom"
import { Auth } from '../../state/Auth';
import { Settings } from "../../state/Settings";
import { useContext, useEffect, useState } from 'react';
import mkbaIcon from '../../assets/icons/sroi-icon.png'
import wallIcon from '../../assets/icons/activity-icon.png'
import SearchIcon from '../../assets/icons/search-icon.png'
import organisationIcon from '../../assets/icons/organisation-icon.png'
import sdgIcon from '../../assets/icons/sdg-icon.png'
import milestoneIcon from '../../assets/icons/milestone-icon.png'
import worldIcon from '../../assets/icons/world-icon2.png'
import sectorIcon from '../../assets/icons/sector-icon.png'
import balansIcon from '../../assets/icons/balans-icon.png'
import outputIcon from '../../assets/icons/output-icon.png'
import pillarIcon from '../../assets/icons/pillar-icon.png'
import Location from "../../helpers/Location";
import RotateRightOutlinedIcon from '@mui/icons-material/RotateRightOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import { useFirestoreGeneral } from '../../firebase/useFirestore'

const Sidebar = () => {
  const [auth] = useContext(Auth)
  const [settings] = useContext(Settings)
  const [organisationProject, setOrganisationProject] = useState('')

  const id = Location()[3]

  const compagnyProject = () => {
    if(settings[0]?.compagnyProject === 'project'){
      return 'Projecten'
    } else {
      return 'Organisaties'
    }
  }


  return (
    <div id='sidebar-container'>
      <div className='sidebar-inner-container'>
        <h2>Dashboard</h2>
        <div className='sidebar-link-container'>
          <TrendingUpOutlinedIcon className='menu-icon'/>
          <NavLink to={`/dashboard/home/${id}`} activeClassName="selected">Dashboard</NavLink>
        </div>
        <h2>Portfolio</h2>
        <div className='sidebar-link-container'>
          <img src={organisationIcon} alt="activity icon" />
          <NavLink to={`/dashboard/organisations/${id}`} activeClassName="selected">{compagnyProject()}</NavLink>
        </div>
        <h2>Impact</h2>
        <div className='sidebar-link-container'>
          <CompareArrowsOutlinedIcon className='menu-icon'/>
          <NavLink to={`/dashboard/effects/${id}`} activeClassName="selected">Effecten</NavLink>
        </div>
        <div className='sidebar-link-container'>
          <CompareArrowsOutlinedIcon className='menu-icon'/>
          <NavLink to={`/dashboard/effects/${id}`} activeClassName="selected">Outputs</NavLink>
        </div>
        <div className='sidebar-link-container'>
          <CompareArrowsOutlinedIcon className='menu-icon'/>
          <NavLink to={`/dashboard/effects/${id}`} activeClassName="selected">Stakeholders</NavLink>
        </div>
        {/* <div className='sidebar-link-container'>
          <img src={mkbaIcon} alt="activity icon" />
          <NavLink to={`/dashboard/mkbas/${id}`} activeClassName="selected">MKBA</NavLink>
        </div> */}
      </div>

    </div>
  )
}

export default Sidebar