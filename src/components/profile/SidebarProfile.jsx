import { NavLink } from "react-router-dom"
import { Auth } from '../../state/Auth';
import { useContext, useEffect, useState } from 'react';
import wallIcon from '../../assets/icons/activity-icon.png'
import HomeIcon from '@mui/icons-material/HomeOutlined';
import PlusIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import { client } from "../../helpers/Client";
import { useFirestoreGeneral } from '../../firebase/useFirestore'

const SidebarProfile = () => {
  const [auth] = useContext(Auth)

  const [admin, setAdmin] = useState(false) 

  const id = client

  const admins = useFirestoreGeneral('admins', 'compagnyID', client)

  useEffect(() => {
    admins && admins.forEach(item => {
      if(item.userId === auth.ID){
        setAdmin(true)
      }
    })
  },admins)

  return (
    <div id='sidebar-container'>
       <div className='sidebar-inner-container'>
        <h2>Home</h2>
        <div className='sidebar-link-container'>
          <HomeIcon className='menu-icon'/>
          <NavLink to={`/dashboard/wall/${id}`} activeClassName="selected">Home</NavLink>
        </div>
      </div>
      <div className='sidebar-inner-container' style={{display: admin ? 'block' : 'none'}}>
        <h2>Admin</h2>
        <div className='sidebar-link-container'>
          <PlusIcon className='menu-icon'/>
          <NavLink to={`/profile/newproject/${id}`} activeClassName="selected">Nieuw project</NavLink>
        </div>
        <div className='sidebar-link-container'>
          <Groups2OutlinedIcon className='menu-icon'/>
          <NavLink to={`/profile/newproject/${id}`} activeClassName="selected">Gebruikersrollen</NavLink>
        </div>
        <div className='sidebar-link-container'>
          <GroupAddOutlinedIcon className='menu-icon'/>
          <NavLink to={`/profile/newproject/${id}`} activeClassName="selected">Team</NavLink>
        </div>
        <div className='sidebar-link-container'>
          <GroupAddOutlinedIcon className='menu-icon'/>
          <NavLink to={`/profile/settings/${id}`} activeClassName="selected">Instellingen</NavLink>
        </div>
      </div>
    </div>
  )
}

export default SidebarProfile