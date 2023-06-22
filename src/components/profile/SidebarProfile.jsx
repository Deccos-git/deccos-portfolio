import { NavLink } from "react-router-dom"
import { Auth } from '../../state/Auth';
import { useContext, useEffect, useState } from 'react';
import wallIcon from '../../assets/icons/activity-icon.png'
import HomeIcon from '@mui/icons-material/HomeOutlined';
import PlusIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Location from "../../helpers/Location";
import { useFirestoreGeneral } from '../../firebase/useFirestore'
import { useFirestoreGeneral as useFirestoreGeneralDeccos } from '../../firebase/useFirestoreDeccos'
import UserCompagnies from "./UserCompagnies";
import { useNavigate } from "react-router-dom";

const SidebarProfile = () => {
  const [auth] = useContext(Auth)

  const [admin, setAdmin] = useState(false) 
  const [compagnySwitch, setCompagnySwitch] = useState(false)

  const id = Location()[3]
  const user = Location()[4]
  const navigate = useNavigate()

  const admins = useFirestoreGeneral('admins', 'compagnyID', id)
  const users = useFirestoreGeneralDeccos('Users', 'ID', user)

  // Set compagnyswitch visibility
  useEffect(() => {
    users && users.forEach(item => {
      const length = item.Finpact.length

      if(length > 1){
        setCompagnySwitch(true)
      }
    })
  },[users])


  useEffect(() => {
    admins && admins.forEach(item => {
      if(item.userId === auth.ID){
        setAdmin(true)
      }
    })
  },[admins])

  const switchAccountHandler = (e) => {

    const compagnyId = e.target.options[e.target.selectedIndex].dataset.id

    navigate(`/dashboard/home/${compagnyId}`)

  }

  return (
    <div id='sidebar-container'>
       <div className='sidebar-inner-container'>
        <h2>Home</h2>
        <div className='sidebar-link-container'>
          <HomeIcon className='menu-icon'/>
          <NavLink to={`/dashboard/home/${id}`} activeClassName="selected">Home</NavLink>
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
          <NavLink to={`/profile/team/${id}`} activeClassName="selected">Team</NavLink>
        </div>
        <div className='sidebar-link-container'>
          <GroupAddOutlinedIcon className='menu-icon'/>
          <NavLink to={`/profile/userroles/${id}`} activeClassName="selected">Gebruikersrollen</NavLink>
        </div>
        <div className='sidebar-link-container'>
          <SettingsOutlinedIcon className='menu-icon'/>
          <NavLink to={`/profile/settings/${id}`} activeClassName="selected">Instellingen</NavLink>
        </div>
      </div>
      <div className='sidebar-inner-container'>
        <h2>Mijn account</h2>
        <div className='sidebar-link-container'>
          <AccountCircleOutlinedIcon className='menu-icon'/>
          <NavLink to={`/profile/profile/${id}/${auth.ID}`} activeClassName="selected">Instellingen</NavLink>
        </div>
      </div>
      <div className='sidebar-inner-container' style={{display: compagnySwitch ? 'block' : 'none'}}>
        <h2>Mijn portfiolo organisaties</h2>
        <select name="" id="" onChange={switchAccountHandler}>
          <option value="">-- Selecteer --</option>
          {users && users.map(item => (
            <UserCompagnies user={item}/>
          ))}
        </select>

      </div>
    </div>
  )
}

export default SidebarProfile