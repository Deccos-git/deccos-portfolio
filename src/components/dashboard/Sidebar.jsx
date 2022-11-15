import { NavLink } from "react-router-dom"
import { Auth } from '../../state/Auth';
import { useContext } from 'react';
import mkbaIcon from '../../assets/icons/sroi-icon.png'
import wallIcon from '../../assets/icons/activity-icon.png'
import SearchIcon from '../../assets/icons/search-icon.png'
import organisationIcon from '../../assets/icons/organisation-icon.png'
import sdgIcon from '../../assets/icons/sdg-icon.png'
import milestoneIcon from '../../assets/icons/milestone-icon.png'
import worldIcon from '../../assets/icons/world-icon2.png'
import sectorIcon from '../../assets/icons/sector-icon.png'
import Location from "../../helpers/Location"

const Sidebar = () => {
  const [auth] = useContext(Auth)

  const id = Location()[3]

  return (
    <div id='sidebar-container'>
      <div className='sidebar-inner-container'>
        <h2>Home</h2>
        <div className='sidebar-link-container'>
          <img src={wallIcon} alt="activity icon" />
          <NavLink to={`/dashboard/wall/${id}`} activeClassName="selected">Mijlpalen</NavLink>
        </div>
        <h2>Portfolio</h2>
        <div className='sidebar-link-container'>
          <img src={organisationIcon} alt="activity icon" />
          <NavLink to={`/dashboard/organisations/${id}`} activeClassName="selected">Organisaties</NavLink>
        </div>
        <div className='sidebar-link-container'>
          <img src={SearchIcon} alt="activity icon" />
          <NavLink to={`/dashboard/discover/${id}`} activeClassName="selected">Ontdek</NavLink>
        </div>
        <h2>Impact</h2>
        <div className='sidebar-link-container'>
          <img src={mkbaIcon} alt="activity icon" />
          <NavLink to="/dashboard/mkba" activeClassName="selected">MKBA</NavLink>
        </div>
        <div className='sidebar-link-container'>
          <img src={sdgIcon} alt="activity icon" />
          <NavLink to="/dashboard/sdgs" activeClassName="selected">SDG's</NavLink>
        </div>
        <div className='sidebar-link-container'>
          <img src={milestoneIcon} alt="activity icon" />
          <NavLink to="/dashboard/goals" activeClassName="selected">Maatschappelijke doelen</NavLink>
        </div>
        <div className='sidebar-link-container'>
          <img src={sectorIcon} alt="activity icon" />
          <NavLink to="/dashboard/sectors" activeClassName="selected">Sectors</NavLink>
        </div>
        <div className='sidebar-link-container'>
          <img src={worldIcon} alt="activity icon" />
          <NavLink to="/dashboard/local" activeClassName="selected">Lokaal</NavLink>
        </div>
      </div>

    </div>
  )
}

export default Sidebar