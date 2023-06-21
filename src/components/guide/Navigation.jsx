import { NavLink } from "react-router-dom"
import Location from "../../helpers/Location";

const Navigation = ({prev, prevLink, next, nextLink}) => {

  const id = Location()[3]

  return (
    <div id='guide-navigation-container'>
      <div style={{visibility: prev ? 'visible' : 'hidden'}}>
        <p>Vorige</p>
        <NavLink to={`/guide/${prevLink}/${id}`} activeClassName="selected"><p><b>{prev}</b> </p></NavLink>
      </div>
      <div style={{visibility: next ? 'visible' : 'hidden'}}>
        <p>Volgende</p>
        <NavLink to={`/guide/${nextLink}/${id}`} activeClassName="selected"><p><b>{next}</b> </p></NavLink>
      </div>
    </div>
  )
}

export default Navigation