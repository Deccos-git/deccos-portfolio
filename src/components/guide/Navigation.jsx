import { NavLink } from "react-router-dom"
import Location from "../../helpers/Location";
import { useNavigate } from "react-router-dom";

const Navigation = ({prev, prevLink, next, nextLink}) => {

  const id = Location()[3]
  const navigate = useNavigate()

  return (
    <div id='guide-navigation-container'>
      <div style={{visibility: prev ? 'visible' : 'hidden'}}>
        <p onClick={() => navigate(`/guide/${prevLink}/${id}`)}>Vorige</p>
        <NavLink to={`/guide/${prevLink}/${id}`} activeClassName="selected"><p><b>{prev}</b> </p></NavLink>
      </div>
      <div style={{visibility: next ? 'visible' : 'hidden'}}>
        <p onClick={() => navigate(`/guide/${nextLink}/${id}`)}>Volgende</p>
        <NavLink to={`/guide/${nextLink}/${id}`} activeClassName="selected"><p><b>{next}</b> </p></NavLink>
      </div>
    </div>
  )
}

export default Navigation