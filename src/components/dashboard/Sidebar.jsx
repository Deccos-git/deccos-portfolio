import { NavLink } from "react-router-dom"
import { Auth } from '../../state/Auth';
import { Settings } from "../../state/Settings";
import { useContext, useState } from 'react';
import DirectionsWalkOutlinedIcon from '@mui/icons-material/DirectionsWalkOutlined';
import Location from "../../helpers/Location";
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import CorporateFareRoundedIcon from '@mui/icons-material/CorporateFareRounded';
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';
import PhotoAlbumOutlinedIcon from '@mui/icons-material/PhotoAlbumOutlined';

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

        <div className="sidebar-section">
          <h2>Dashboard</h2>
          <div className='sidebar-link-container'>
            <DashboardRoundedIcon className='menu-icon'/>
            <NavLink to={`/dashboard/home/${id}`} activeClassName="selected">Dashboard</NavLink>
          </div>
        </div>
        
        <div className="sidebar-section">
          <h2>Portfolio</h2>
          <div className='sidebar-link-container'>
            <CorporateFareRoundedIcon className='menu-icon'/>
            <NavLink to={`/dashboard/organisations/${id}`} activeClassName="selected">{compagnyProject()}</NavLink>
          </div>
        </div>

        <div className="sidebar-section">
          <h2>Theory of Change</h2>
          <div className='sidebar-link-container'>
            <TrendingUpOutlinedIcon className='menu-icon'/>
            <NavLink to={`/dashboard/theoryofchange/${id}`} activeClassName="selected">Theory of Change</NavLink>
          </div>
          {/* <div className='sidebar-link-container'>
            <OutlinedFlagIcon  className='menu-icon'/>
            <NavLink to={`/dashboard/goal/${id}`} activeClassName="selected">Maatschappelijk doel</NavLink>
          </div> */}
          {/* <div className='sidebar-link-container'>
            <DirectionsWalkOutlinedIcon className='menu-icon'/>
            <NavLink to={`/dashboard/activities/${id}`} activeClassName="selected">Activiteiten</NavLink>
          </div>
          <div className='sidebar-link-container'>
            <OutputRoundedIcon className='menu-icon'/>
            <NavLink to={`/dashboard/outputs/${id}`} activeClassName="selected">Outputs</NavLink>
          </div> */}
          <div className='sidebar-link-container'>
            <CompareArrowsOutlinedIcon className='menu-icon'/>
            <NavLink to={`/dashboard/effects/${id}`} activeClassName="selected">Effecten</NavLink>
          </div>
          <div className='sidebar-link-container'>
            <LandscapeOutlinedIcon className='menu-icon'/>
            <NavLink to={`/dashboard/kpis/${id}`} activeClassName="selected">KPIs</NavLink>
          </div>
        </div>

        <div className="sidebar-section">
          <h2>Thema's</h2>
          <div className='sidebar-link-container'>
            <PhotoAlbumOutlinedIcon className='menu-icon'/>
            <NavLink to={`/dashboard/packages/${id}`} activeClassName="selected">Thema's</NavLink>
          </div>
        </div>
       
        {/* <div className='sidebar-link-container'>
          <GroupOutlinedIcon className='menu-icon'/>
          <NavLink to={`/dashboard/targetgroups/${id}`} activeClassName="selected">Doelgroepen</NavLink>
        </div> */}
        {/* <div className='sidebar-link-container'>
          <img src={mkbaIcon} alt="activity icon" />
          <NavLink to={`/dashboard/mkbas/${id}`} activeClassName="selected">MKBA</NavLink>
        </div> */}
      </div>

    </div>
  )
}

export default Sidebar