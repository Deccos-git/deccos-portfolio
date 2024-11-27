import { Routes, Route} from "react-router-dom";

// Layout
import Layout from '../components/layout/Layout'
import LayoutProfile from '../components/layout/LayoutProfile'

// Dashboard
import Dashboard from "../pages/dashboard/Dashboard";
import Notifications from "../pages/dashboard/Notifications"

// Portfolio
import Organisations from "../pages/portfolio/Organisations";
import Organisation from "../pages/portfolio/Organisation";
import Synchronisations from "../pages/portfolio/Synchronisations";

// Impact strategy
import SocietalProblem from "../pages/impactStrategy/SocietalProblem";
import Targetgroups from "../pages/impactStrategy/Targetgroups";
import Activities from "../pages/impactStrategy/Activities";
import Effects from "../pages/impactStrategy/Effects";
import EffectDetail from "../pages/impactStrategy/EffectDetail";
import TheoryOfChange from "../pages/impactStrategy/TheoryOfChange";
import Goal from "../pages/impactStrategy/Goal";
import Outputs from "../pages/impactStrategy/Outputs";
import SelectMSIEffects from "../pages/impactStrategy/SelectMSIEffects";
import AddIndicators from "../pages/impactStrategy/AddIndicators";
import OutputResultsDetail from "../pages/impactStrategy/OutputResultsDetail";

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
            <Route exact path={`/dashboard/settings/:id/:id`} element={<Settings/>}/>
            <Route exact path={`/dashboard/notifications/:id`} element={<Notifications/>}/>
          </Route>

          {/* Impact strategy */}
          <Route path={`/impactstrategy`} element={<Layout/>} >
            <Route exact path={`/impactstrategy/societalproblem/:id`} element={<SocietalProblem/>}/>
            <Route exact path={`/impactstrategy/targetgroups/:id`} element={<Targetgroups/>}/>
            <Route exact path={`/impactstrategy/activities/:id`} element={<Activities/>}/>
            <Route exact path={`/impactstrategy/effects/:id`} element={<Effects/>}/>
            <Route exact path={`/impactstrategy/effectdetail/:id/:id`} element={<EffectDetail/>}/>
            <Route exact path={`/impactstrategy/theoryofchange/:id`} element={<TheoryOfChange/>}/>
            <Route exact path={`/impactstrategy/goal/:id`} element={<Goal/>}/>
            <Route exact path={`/impactstrategy/outputs/:id`} element={<Outputs/>}/>
            <Route exact path={`/impactstrategy/activities/:id`} element={<Activities/>}/>
            <Route exact path={`/impactstrategy/selectmsieffects/:id`} element={<SelectMSIEffects/>}/>
            <Route exact path={`/impactstrategy/addindicators/:id/:id`} element={<AddIndicators/>}/>
            <Route exact path={`/impactstrategy/outputresultsdetail/:id/:id`} element={<OutputResultsDetail/>}/>
          </Route>

          {/* Portfolio */}
          <Route path={`/portfolio`} element={<Layout/>} >
            <Route exact path={`/portfolio/organisations/:id`} element={<Organisations/>}/>
            <Route exact path={`/portfolio/organisation/:id/:id`} element={<Organisation/>}/>
            <Route exact path={`/portfolio/synchronisations/:id`} element={<Synchronisations/>}/>
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