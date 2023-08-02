import { useNavigate } from "react-router-dom";
import { Auth } from '../../state/Auth';
import { useContext, useEffect, useState } from 'react';
import SearchIcon from '../../assets/icons/search-icon.png'
import { NavLink } from "react-router-dom"
import Location from "../../helpers/Location";
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import { useFirestoreCompagny } from "../../firebase/useFirestore";
import Tooltip from "../common/Tooltip";

const TopBar = () => {
  const [user] = useContext(Auth)

  const [logo, setLogo] = useState('')

  const navigate = useNavigate()

  const id = Location()[3]

  const compagnies = useFirestoreCompagny('compagnies') 

  //Set compagny logo
  useEffect(() => {
    compagnies && compagnies.forEach(item => {
      setLogo(item.logo)
    })
  },[compagnies])

  return (
      <div id='topbar-landing-container'>
        <img id='topbar-logo' src={logo} alt="Logo" onClick={() => navigate(`/dashboard/home/${id}`)} />
        <div className='icon-container'>
          <NavLink to={`/dashboard/search/${id}`} activeClassName="selected">
            <Tooltip content='Zoeken' width='80%' top='60px'>
              <img src={SearchIcon} alt="search icon" />
            </Tooltip>
          </NavLink>
          <NavLink to={`/guide/welcome/${id}`} activeClassName="selected">
            <Tooltip content='Impact gids' width='80%' top='60px'>
              <AutoFixHighOutlinedIcon />
            </Tooltip>
          </NavLink>
        </div>
        <div>
          <div id='user-profile-container' onClick={() => navigate(`/profile/profile/${id}/${user.id}`) }>
            <img src={user.photo} alt="profile picture" />
            <p>{user.forName}</p>
          </div>
        </div>
      </div>
  )
}

export default TopBar