import { useNavigate } from "react-router-dom";
import { Auth } from '../../state/Auth';
import { useContext, useEffect, useState } from 'react';
import SearchIcon from '../../assets/icons/search-icon.png'
import { NavLink } from "react-router-dom"
import Location from "../../helpers/Location";
import UserIcon from '../../assets/icons/user-icon.png'
import SettingsIcon from '../../assets/icons/settings-icon.png'
import SignOutIcon from '../../assets/icons/sign-out-icon.png'
import { signOut } from "firebase/auth";
import { useFirestoreCompagny } from "../../firebase/useFirestore";
import { authDeccos } from "../../firebase/configDeccos";

const TopBar = () => {
  const [user] = useContext(Auth)

  const [logo, setLogo] = useState('')

  const [showProfileDropdown, setShowProfileDropdown] = useState('none')

  const navigate = useNavigate()

  const id = Location()[3]

  const compagnies = useFirestoreCompagny('compagnies') 

  //Set compagny logo
  useEffect(() => {
    compagnies && compagnies.forEach(item => {
      setLogo(item.logo)
    })
  },[compagnies])

  const profileLink = () => {

    navigate(`/profile/profile/${id}/${user.ID}`) 
    
    setShowProfileDropdown('none')
  }

  const logout = () => {
    signOut(authDeccos).then(() => {
      navigate(`/login`) 
    }).catch((error) => {
      alert(error)
    });

    
  }


  return (
      <div id='topbar-landing-container'>
        <img id='topbar-logo' src={logo} alt="Logo" onClick={() => navigate(`/dashboard/home/${id}`)} />
        <div className='icon-container'>
          <NavLink to={`/dashboard/search/${id}`} activeClassName="selected">
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
            <div className='line-div'></div>
            <div className='dropdown-icon-container'>
                <img src={SignOutIcon} alt="settings-icon" onClick={logout}/>
                <p onClick={logout}>Uitloggen</p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default TopBar