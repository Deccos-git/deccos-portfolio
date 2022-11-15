import { NavLink } from "react-router-dom"
import { Auth } from '../../state/Auth';
import { useContext } from 'react';
import mkbaIcon from '../../assets/icons/sroi-icon.png'
import wallIcon from '../../assets/icons/activity-icon.png'

const Sidebar = () => {
  const [auth] = useContext(Auth)

  return (
    <div id='sidebar-container'>
      <div className='sidebar-inner-container'>
        <h2>Home</h2>
        <div className='sidebar-link-container'>
          <img src={wallIcon} alt="activity icon" />
          <NavLink to="/dashboard/wall" activeClassName="selected">Mijlpalen</NavLink>
        </div>
        <h2>Impact</h2>
        <div className='sidebar-link-container'>
          <img src={mkbaIcon} alt="activity icon" />
          <NavLink to="/dashboard/mkba" activeClassName="selected">MKBA</NavLink>
        </div>
      </div>

    </div>
  )
}

export default Sidebar