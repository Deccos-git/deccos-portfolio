import { NavLink } from "react-router-dom"
import { Auth } from '../../state/Auth';
import { Settings } from "../../state/Settings";
import { useContext, useState } from 'react';
import organisationIcon from '../../assets/icons/organisation-icon.png'
import Location from "../../helpers/Location";
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import OutputRoundedIcon from '@mui/icons-material/OutputRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import CorporateFareRoundedIcon from '@mui/icons-material/CorporateFareRounded';


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
          <DashboardRoundedIcon className='menu-icon'/>
          <NavLink to={`/dashboard/home/${id}`} activeClassName="selected">Dashboard</NavLink>
        </div>
        <h2>Portfolio</h2>
        <div className='sidebar-link-container'>
          <CorporateFareRoundedIcon className='menu-icon'/>
          <NavLink to={`/dashboard/organisations/${id}`} activeClassName="selected">{compagnyProject()}</NavLink>
        </div>
        <h2>Impact</h2>
        <div className='sidebar-link-container'>
          <CompareArrowsOutlinedIcon className='menu-icon'/>
          <NavLink to={`/dashboard/effects/${id}`} activeClassName="selected">Effecten</NavLink>
        </div>
        <div className='sidebar-link-container'>
          <OutputRoundedIcon className='menu-icon'/>
          <NavLink to={`/dashboard/outputs/${id}`} activeClassName="selected">Outputs</NavLink>
        </div>
        <div className='sidebar-link-container'>
          <GroupOutlinedIcon className='menu-icon'/>
          <NavLink to={`/dashboard/targetgroups/${id}`} activeClassName="selected">Doelgroepen</NavLink>
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