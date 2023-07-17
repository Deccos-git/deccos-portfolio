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
import TheoryOfChange from "../pages/dashboard/TheoryOfChange";
import Goal from "../pages/dashboard/Goal";
import Outputs from "../pages/dashboard/Outputs";
import Activities from "../pages/dashboard/Activities";
import Kpis from "../pages/dashboard/Kpis";
import KpiDetail from "../pages/dashboard/KpiDetail";
import Themes from "../pages/dashboard/Themes";
import ThemeDetail from "../pages/dashboard/ThemeDetail";

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

//Guide
import LayoutGuide from "../components/guide/Layout";
import GoalGuide from "../pages/guide/Goal";
import Overview from "../pages/guide/Overview";
import ActivitiesGuide from "../pages/guide/Activities";
import OutputsGuide from "../pages/guide/Outputs";
import EffectsGuide from "../pages/guide/Effects";
import KpisGuide from "../pages/guide/Kpis";
import ThemesGuide from "../pages/guide/Themes";
import PairsGuide from "../pages/guide/Pairs";
import ThemeBuilder from "../pages/guide/ThemeBuilder";

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
            <Route exact path={`/dashboard/theoryofchange/:id`} element={<TheoryOfChange/>}/>
            <Route exact path={`/dashboard/goal/:id`} element={<Goal/>}/>
            <Route exact path={`/dashboard/outputs/:id`} element={<Outputs/>}/>
            <Route exact path={`/dashboard/activities/:id`} element={<Activities/>}/>
            <Route exact path={`/dashboard/kpis/:id`} element={<Kpis/>}/>
            <Route exact path={`/dashboard/kpidetail/:id/:id`} element={<KpiDetail/>}/>
            <Route exact path={`/dashboard/themes/:id`} element={<Themes/>}/>
            <Route exact path={`/dashboard/themedetail/:id/:id`} element={<ThemeDetail/>}/>
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
          <Route path={`/guide`} element={<LayoutGuide/>}>
            <Route exact path={`/guide/welcome/:id/`} element={<Overview/>}/>
            <Route exact path={`/guide/goal/:id/`} element={<GoalGuide/>}/>
            <Route exact path={`/guide/activities/:id/`} element={<ActivitiesGuide/>}/>
            <Route exact path={`/guide/outputs/:id/`} element={<OutputsGuide/>}/>
            <Route exact path={`/guide/effects/:id/`} element={<EffectsGuide/>}/>
            <Route exact path={`/guide/kpis/:id/`} element={<KpisGuide/>}/>
            <Route exact path={`/guide/themes/:id/`} element={<ThemesGuide/>}/>
            <Route exact path={`/guide/themebuilder/:id/:id/:id`} element={<ThemeBuilder/>}/>
            <Route exact path={`/guide/pairs/:id/`} element={<PairsGuide/>}/>
          </Route>
      </Routes>
    )
  }
  
  export default Navigation