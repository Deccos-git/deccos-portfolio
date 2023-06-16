import Topbar from "../../components/guide/Topbar"
import Navigation from "../../components/guide/Navigation"
import Instructions from "../../components/guide/Instructions"
import Settings from "../../components/guide/Settings"
import { NavLink } from "react-router-dom"
import Location from "../../helpers/Location";

const Overview = () => {

    const id = Location()[3]

    const text = () => {

        return (
            <>
                <p>
                    <b>
                        In de impact gids wordt je stap voor stap meegenomen in het proces om een impact strategie te ontwikkelen. 
                    </b>
                </p>
                <p>
                    Op basis van de input die je geeft, wordt er een impact strategie op maat gemaakt.
                    Je impact strategie wordt gebruikt om de impact van de projecten of organisaties die je beheert te koppelen aan
                    jouw maatschappelijke doelen. 
                </p>
                <p>
                    Zo heb je een real-time overzicht van de impact die je maakt.
                </p>
            </>
        )
    }

    const settings = () => {

        return (
            <div className="steps-overview-container">
                <NavLink to={`/guide/welcome/${id}`} activeClassName="selected"><p>1. Welkom</p></NavLink>
                <NavLink to={`/guide/goal/${id}`} activeClassName="selected"><p>2. Maatschappelijk doel</p></NavLink>
                <NavLink to={`/guide/activities/${id}`} activeClassName="selected"><p>3. Activiteiten</p></NavLink>
                <NavLink to={`/guide/outputs/${id}`} activeClassName="selected"><p>4. Outputs</p></NavLink>
                <NavLink to={`/guide/effects/${id}`} activeClassName="selected"><p>5. Effecten</p></NavLink>
            </div>
        )
    }
                        

  return (
    <div>
         <Navigation
        next="Maatschappelijk doel"
        nextLink="goal"/>
         <Topbar 
        title="Welkom in de impact gids" 
        next="Maatschappelijk doel"
        />
        <Instructions
        text={text()}
        />
        <Settings
        settings={settings()}
        />
    </div>
  )
}

export default Overview