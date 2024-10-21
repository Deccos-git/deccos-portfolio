import { Routes, Route} from "react-router-dom";

// Layout
import Layout from '../components/layout/Layout'
import LayoutProfile from '../components/layout/LayoutProfile'

// Dashboard
import Dashboard from "../pages/dashboard/Dashboard";
import Organisations from "../pages/dashboard/Organisations";
import Organisation from "../pages/dashboard/Organisation";
import Search from "../pages/dashboard/Search";
import Effects from "../pages/dashboard/Effects";
import EffectDetail from "../pages/dashboard/EffectDetail";
import TheoryOfChange from "../pages/dashboard/TheoryOfChange";
import Goal from "../pages/dashboard/Goal";
import Outputs from "../pages/dashboard/Outputs";
import Activities from "../pages/dashboard/Activities";
import Synchronisations from "../pages/dashboard/Synchronisations";
import OutputResultsDetail from "../pages/dashboard/OutputResultsDetail";
import Notifications from "../pages/dashboard/Notifications";
import SelectMSIEffects from "../pages/dashboard/SelectMSIEffects";

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
import Projects from "../pages/admin/Projects";

const Navigation = () => {

    return (
      <Routes>

        {/* Dashboard */}
          <Route path={`/dashboard`} element={<Layout/>} >
            <Route exact path={`/dashboard/home/:id`} element={<Dashboard/>}/>
            <Route exact path={`/dashboard/organisations/:id`} element={<Organisations/>}/>
            <Route exact path={`/dashboard/organisation/:id/:id`} element={<Organisation/>}/>
            <Route exact path={`/dashboard/search/:id`} element={<Search/>}/>
            <Route exact path={`/dashboard/settings/:id/:id`} element={<Settings/>}/>
            <Route exact path={`/dashboard/effects/:id`} element={<Effects/>}/>
            <Route exact path={`/dashboard/effectdetail/:id/:id`} element={<EffectDetail/>}/>
            <Route exact path={`/dashboard/theoryofchange/:id`} element={<TheoryOfChange/>}/>
            <Route exact path={`/dashboard/goal/:id`} element={<Goal/>}/>
            <Route exact path={`/dashboard/outputs/:id`} element={<Outputs/>}/>
            <Route exact path={`/dashboard/activities/:id`} element={<Activities/>}/>
            <Route exact path={`/dashboard/synchronisations/:id/:id`} element={<Synchronisations/>}/>
            <Route exact path={`/dashboard/outputresultsdetail/:id/:id`} element={<OutputResultsDetail/>}/>
            <Route exact path={`/dashboard/notifications/:id`} element={<Notifications/>}/>
            <Route exact path={`/dashboard/selectmsieffects/:id`} element={<SelectMSIEffects/>}/>
          </Route>

          {/* Auth */}
          <Route path={`/`} >
              <Route exact path={`/`} element={<Login/>}/>
              <Route exact path={`/login/:id`} element={<Login/>}/>
              <Route exact path={`/register/:id`} element={<Register/>}/>
              <Route exact path={`/verifyAccount/:id/:id`} element={<VerifyAccount/>}/>
              <Route exact path={`/newclient`} element={<NewClient/>}/>
          </Route>

          {/* Admin */}
          <Route path={`/profile`} element={<LayoutProfile/>}>
            <Route exact path={`/profile/profile/:id/:id`} element={<Profile/>}/>
            <Route exact path={`/profile/newproject/:id`} element={<Newproject/>}/>
            <Route exact path={`/profile/settings/:id`} element={<Settings/>}/>
            <Route exact path={`/profile/team/:id`} element={<Team/>}/>
            <Route exact path={`/profile/userroles/:id`} element={<Userroles/>}/>
            <Route exact path={`/profile/effectsettings/:id`} element={<EffectsSettings/>}/>
            <Route exact path={`/profile/projects/:id`} element={<Projects/>}/>
          </Route>

      </Routes>
    )
  }
  
  export default Navigation