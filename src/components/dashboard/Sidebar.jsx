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
  console.log(settings)

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
        <h2>Home</h2>
        <div className='sidebar-link-container'>
          <img src={wallIcon} alt="activity icon" />
          <NavLink to={`/dashboard/wall/${id}`} activeClassName="selected">Mijlpalen</NavLink>
        </div>
        <div className='sidebar-link-container'>
          <TrendingUpOutlinedIcon className='menu-icon'/>
          <NavLink to={`/dashboard/theoryofchange/${id}`} activeClassName="selected">Theory of Change</NavLink>
          <p className='comming-soon'>Comming soon</p>
        </div>
        <h2>Portfolio</h2>
        <div className='sidebar-link-container'>
          <img src={organisationIcon} alt="activity icon" />
          <NavLink to={`/dashboard/organisations/${id}`} activeClassName="selected">{compagnyProject()}</NavLink>
        </div>
        <div className='sidebar-link-container'>
          <img src={pillarIcon} alt="activity icon" />
          <NavLink to={`/dashboard/pillars/${id}`} activeClassName="selected">Impact pijlers</NavLink>
        </div>
        {/* <div className='sidebar-link-container'>
          <img src={SearchIcon} alt="activity icon" />
          <NavLink to={`/dashboard/discover/${id}`} activeClassName="selected">Ontdek</NavLink>
        </div> */}
        <h2>Voortgang</h2>
        <div className='sidebar-link-container'>
          <RotateRightOutlinedIcon className='menu-icon'/>
          <NavLink to={`/dashboard/progress/${id}`} activeClassName="selected">Voortgang</NavLink>
          <p className='comming-soon'>Comming soon</p>
        </div>
        <h2>Impact</h2>
        <div className='sidebar-link-container'>
          <FlagOutlinedIcon className='menu-icon'/>
          <NavLink to={`/dashboard/goals/${id}`} activeClassName="selected">Maatschappelijke doelen</NavLink>
        </div>
        <div className='sidebar-link-container'>
          <GroupOutlinedIcon className='menu-icon'/>
          <NavLink to={`/dashboard/targetgroups/${id}`} activeClassName="selected">Doelgroepen</NavLink>
        </div>
        <div className='sidebar-link-container'>
          <img src={milestoneIcon} alt="activity icon" />
          <NavLink to={`/dashboard/activities/${id}`} activeClassName="selected">Activiteiten</NavLink>
        </div>
        <div className='sidebar-link-container'>
          <img src={outputIcon} alt="activity icon" />
          <NavLink to={`/dashboard/outputs/${id}`} activeClassName="selected">Outputs</NavLink>
        </div>
        <div className='sidebar-link-container'>
          <CompareArrowsOutlinedIcon className='menu-icon'/>
          <NavLink to={`/dashboard/effects/${id}`} activeClassName="selected">Effecten</NavLink>
        </div>
        <div className='sidebar-link-container'>
          <img src={mkbaIcon} alt="activity icon" />
          <NavLink to={`/dashboard/mkbas/${id}`} activeClassName="selected">MKBA</NavLink>
        </div>
        <div className='sidebar-link-container'>
          <img src={sdgIcon} alt="activity icon" />
          <NavLink to={`/dashboard/sdgs/${id}`} activeClassName="selected">SDG's</NavLink>
          <p className='comming-soon'>Comming soon</p>
        </div>
        <div className='sidebar-link-container'>
          <img src={sectorIcon} alt="activity icon" />
          <NavLink to={`/dashboard/sectors/${id}`} activeClassName="selected">Sectoren</NavLink>
          <p className='comming-soon'>Comming soon</p>
        </div>
        <div className='sidebar-link-container'>
          <img src={worldIcon} alt="activity icon" />
          <NavLink to={`/dashboard/local/${id}`} activeClassName="selected">Lokaal</NavLink>
          <p className='comming-soon'>Comming soon</p>
        </div>
        <h2>Benchmark</h2>
        <div className='sidebar-link-container'>
          <img src={balansIcon} alt="activity icon" />
          <NavLink to={`/dashboard/benchmark/${id}`} activeClassName="selected">Benchmark</NavLink>
          <p className='comming-soon'>Comming soon</p>
        </div>
        <h2>Communiceren</h2>
        <div className='sidebar-link-container'>
          <TextsmsOutlinedIcon className='menu-icon'/>
          <NavLink to={`/dashboard/chat/${id}`} activeClassName="selected">Chat</NavLink>
          <p className='comming-soon'>Comming soon</p>
        </div>
      </div>

    </div>
  )
}

export default Sidebar