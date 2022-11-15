import { useNavigate } from "react-router-dom";
import { Auth } from '../../state/Auth';
import { useContext, useEffect, useState } from 'react';
import SearchIcon from '../../assets/icons/search-icon.png'
import { NavLink } from "react-router-dom"
import Location from "../../helpers/Location"
import UserIcon from '../../assets/icons/user-icon.png'
import SettingsIcon from '../../assets/icons/settings-icon.png'
import SignOutIcon from '../../assets/icons/sign-out-icon.png'
import { getAuth, signOut } from "firebase/auth";
import { useFirestoreId } from "../../firebase/useFirestore";

const TopBar = () => {
  const [user] = useContext(Auth)

  const [logo, setLogo] = useState('')

  const [showProfileDropdown, setShowProfileDropdown] = useState('none')

  const navigate = useNavigate()

  const id = Location()[3]

  const compagnies = useFirestoreId('compagnies', id) 

  //Set compagny logo
  useEffect(() => {
    compagnies && compagnies.forEach(item => {
      setLogo(item.logo)
    })
  },[compagnies])

  const profileLink = () => {

    navigate(`profile/${user.ID}`) 
    
    setShowProfileDropdown('none')
  }

  const settingsLink = () => {

    navigate(`settings/${user.ID}`) 
    
    setShowProfileDropdown('none')
  }

  const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate(`/login`) 
    }).catch((error) => {
      alert(error)
    });

    
  }


  return (
      <div id='topbar-landing-container'>
        <img id='topbar-logo' src={logo} alt="Logo" onClick={() => navigate(`/`)} />
        <div className='icon-container'>
          <NavLink to={`/dashboard/search`} activeClassName="selected">
            <img src={SearchIcon} alt="search icon" />
          </NavLink>
        </div>
        <div>
          <div id='user-profile-container' onMouseEnter={() => setShowProfileDropdown('flex')}>
            <img src={user.Photo} alt="profile picture" />
            <p>{user.ForName}</p>
          </div>
          <div className='dropdown-container dropdown-container-profile' style={{display: showProfileDropdown}} onMouseLeave={() => setShowProfileDropdown('none')}>
            <div className='dropdown-icon-container'>
                <img src={UserIcon} alt="user-icon" onClick={profileLink}/>
                <p onClick={profileLink}>Profiel</p>
            </div>
            <div className='dropdown-icon-container'>
                <img src={SettingsIcon} alt="settings-icon" onClick={settingsLink}/>
                <p onClick={settingsLink}>Instellingen</p>
            </div>
            <div className='line-div'></div>
            <div className='dropdown-icon-container'>
                <img src={SignOutIcon} alt="settings-icon" onClick={settingsLink}/>
                <p onClick={logout}>Uitloggen</p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default TopBar