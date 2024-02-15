import { useNavigate } from "react-router-dom";
import { Auth } from '../../state/Auth';
import { useContext, useEffect, useState } from 'react';
import SearchIcon from '../../assets/icons/search-icon.png'
import { NavLink } from "react-router-dom"
import Location from "../../helpers/Location";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Tooltip from "../common/Tooltip";

const TopBar = () => {
  const [user] = useContext(Auth)

  const navigate = useNavigate()

  const id = Location()[3]

  return (
      <div id='topbar-landing-container'>
        <div className="topbar-icon-item-container">
          <Tooltip content={'Notificaties'} top='35px' >
            <NotificationsNoneOutlinedIcon onClick={() => navigate(`/dashboard/notifications/${id}`)}/>
          </Tooltip>
        </div>
        <div id='user-profile-container' onClick={() => navigate(`/profile/profile/${id}/${user.id}`) }>
          <Tooltip content={'Profiel en settings'} top='35px' >
            <img src={user.photo} alt="profile picture" />
          </Tooltip>
          <p>{user.forName}</p>
        </div>
      </div>
  )
}

export default TopBar