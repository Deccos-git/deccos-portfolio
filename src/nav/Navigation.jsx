import { Routes, Route} from "react-router-dom";
import Layout from '../components/dashboard/Layout'
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Wall from "../pages/dashboard/Wall";
import NewClient from "../pages/admin/Newclient";
import Organisations from "../pages/dashboard/Organisations";
import Organisation from "../pages/dashboard/Organisation";
import Discover from "../pages/dashboard/Discover";

const Navigation = () => {
    return (
      <Routes>
          <Route path={`/dashboard`} element={<Layout/>} >
            <Route exact path={`/dashboard/wall/:id`} element={<Wall/>}/>
            <Route exact path={`/dashboard/organisations/:id`} element={<Organisations/>}/>
            <Route exact path={`/dashboard/organisation/:id`} element={<Organisation/>}/>
            <Route exact path={`/dashboard/discover/:id`} element={<Discover/>}/>
          </Route>
          <Route path={`/`} >
              <Route exact path={`/`} element={<Login/>}/>
              <Route exact path={`/login`} element={<Login/>}/>
              <Route exact path={`/register`} element={<Register/>}/>
              <Route exact path={`/newclient`} element={<NewClient/>}/>
          </Route>
      </Routes>
    )
  }
  
  export default Navigation