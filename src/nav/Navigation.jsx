import { Routes, Route} from "react-router-dom";

// Layout
import Layout from '../components/dashboard/Layout'
import LayoutProfile from "../components/profile/LayoutProfile";

// Dashboard
import Dashboard from "../pages/dashboard/Dashboard";
import Organisations from "../pages/dashboard/Organisations";
import Organisation from "../pages/dashboard/Organisation";
import Search from "../pages/dashboard/Search";
import Effects from "../pages/dashboard/Effects";

// Auth
import Profile from "../pages/auth/Profile";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import VerifyAccount from "../pages/auth/VerifyAccount";

// Admin
import Newproject from "../pages/admin/Newproject";
import Settings from "../pages/admin/Settings";
import Team from "../pages/admin/Team";
import Userroles from "../pages/admin/Userroles";
import NewClient from "../pages/admin/Newclient";
import EffectsSettings from "../pages/admin/EffectsSettings";

const Navigation = () => {

    return (
      <Routes>
          <Route path={`/dashboard`} element={<Layout/>} >
            <Route exact path={`/dashboard/home/:id`} element={<Dashboard/>}/>
            <Route exact path={`/dashboard/organisations/:id`} element={<Organisations/>}/>
            <Route exact path={`/dashboard/organisation/:id/:id`} element={<Organisation/>}/>
            <Route exact path={`/dashboard/search/:id`} element={<Search/>}/>
            <Route exact path={`/dashboard/settings/:id/:id`} element={<Settings/>}/>
            <Route exact path={`/dashboard/effects/:id`} element={<Effects/>}/>
          </Route>
          <Route path={`/`} >
              <Route exact path={`/`} element={<Login/>}/>
              <Route exact path={`/login/:id`} element={<Login/>}/>
              <Route exact path={`/register/:id`} element={<Register/>}/>
              <Route exact path={`/verifyAccount/:id/:id`} element={<VerifyAccount/>}/>
              <Route exact path={`/newclient`} element={<NewClient/>}/>
          </Route>
          <Route path={`/profile`} element={<LayoutProfile/>}>
            <Route exact path={`/profile/profile/:id/:id`} element={<Profile/>}/>
            <Route exact path={`/profile/newproject/:id`} element={<Newproject/>}/>
            <Route exact path={`/profile/settings/:id`} element={<Settings/>}/>
            <Route exact path={`/profile/team/:id`} element={<Team/>}/>
            <Route exact path={`/profile/userroles/:id`} element={<Userroles/>}/>
            <Route exact path={`/profile/effectsettings/:id`} element={<EffectsSettings/>}/>
          </Route>
      </Routes>
    )
  }
  
  export default Navigation