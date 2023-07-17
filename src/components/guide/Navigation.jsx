import { NavLink } from "react-router-dom"
import Location from "../../helpers/Location";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

const Navigation = ({prev, prevLink, next, nextLink}) => {

  const id = Location()[3]
  const navigate = useNavigate()

  return (
    <div id='guide-navigation-container'>
      <div className="guide-navigation-item-container" style={{visibility: prev ? 'visible' : 'hidden'}}>
        <KeyboardArrowLeftOutlinedIcon id='guide-navigation-left-icon' onClick={() => navigate(`/guide/${prevLink}/${id}`)} />
        <NavLink to={`/guide/${prevLink}/${id}`} activeClassName="selected"><p>{prev}</p></NavLink>
      </div>
      <div className="guide-navigation-item-container" style={{visibility: next ? 'visible' : 'hidden'}}>
        <NavLink to={`/guide/${nextLink}/${id}`} activeClassName="selected"><p>{next}</p></NavLink>
        <KeyboardArrowRightOutlinedIcon id='guide-navigation-right-icon' onClick={() => navigate(`/guide/${nextLink}/${id}`)} />
      </div>
    </div>
  )
}

export default Navigation