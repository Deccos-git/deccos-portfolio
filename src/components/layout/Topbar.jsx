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

  const navigate = useNavigate()

  const id = Location()[3]

  return (
      <div id='topbar-landing-container'>
        <div id='user-profile-container' onClick={() => navigate(`/profile/profile/${id}/${user.id}`) }>
          <img src={user.photo} alt="profile picture" />
          <p>{user.forName}</p>
        </div>
      </div>
  )
}

export default TopBar