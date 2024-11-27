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
import OutputOutlinedIcon from '@mui/icons-material/OutputOutlined';
import PodcastsOutlinedIcon from '@mui/icons-material/PodcastsOutlined';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import { PortfolioMeta } from "../../state/PortfolioMeta";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  // Context
  const [auth] = useContext(Auth)
  const [settings] = useContext(Settings)
  const [portfolioMeta] = useContext(PortfolioMeta)

  // Hooks
  const id = Location()[3]
  const navigate = useNavigate()

  return (
    <div id='sidebar-container'>
      <div className='sidebar-inner-container'>
        <div id='sidebar-logo-container'>
          <img src={portfolioMeta[0]?.logo ? portfolioMeta[0].logo : ''} alt="" />
        </div>

        <div className="sidebar-section">
          
          <div className='sidebar-link-container' onClick={() => navigate(`/dashboard/home/${id}`)}>
            <DashboardRoundedIcon className='menu-icon'/>
            <h2>Dashboard</h2>
          </div>
        </div>

        <div className="sidebar-section">
          <div className='sidebar-link-container' onClick={() => navigate(`/portfolio/organisations/${id}`)}>
            <CorporateFareRoundedIcon className='menu-icon'/>
            <h2>Portfolio</h2>
          </div>
        </div>

        <div className="sidebar-section">
          <div className='sidebar-link-container'>
            <ChangeCircleOutlinedIcon className='menu-icon'/>
            <h2>Impactstrategie</h2>
          </div>
          <div className='sidebar-link-container'>
            <NavLink to={`/impactstrategy/societalproblem/${id}`} activeClassName="selected">Maatschappelijk probleem</NavLink>
          </div>
          <div className='sidebar-link-container'>
            <NavLink to={`/impactstrategy/targetgroups/${id}`} activeClassName="selected">Doelgroepen</NavLink>
          </div>
          <div className='sidebar-link-container'>
            <NavLink to={`/impactstrategy/goal/${id}`} activeClassName="selected">Impactdoel</NavLink>
          </div>
          <div className='sidebar-link-container'>
            <NavLink to={`/impactstrategy/activities/${id}`} activeClassName="selected">Activiteiten</NavLink>
          </div>
          <div className='sidebar-link-container'>
            <NavLink to={`/impactstrategy/outputs/${id}`} activeClassName="selected">Outputs</NavLink>
          </div>
          <div className='sidebar-link-container'>
            <NavLink to={`/impactstrategy/effects/${id}`} activeClassName="selected">Effecten</NavLink>
          </div>
          <div className='sidebar-link-container'>
            <NavLink to={`/impactstrategy/theoryofchange/${id}`} activeClassName="selected">Theory of Change</NavLink>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Sidebar