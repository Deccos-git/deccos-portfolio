import { Routes, Route} from "react-router-dom";

// Layout
import Layout from '../components/dashboard/Layout'
import LayoutProfile from "../components/profile/LayoutProfile";

// Dashboard
import Wall from "../pages/dashboard/Wall";
import Organisations from "../pages/dashboard/Organisations";
import Organisation from "../pages/dashboard/Organisation";
import Discover from "../pages/dashboard/Discover";
import Local from "../pages/dashboard/Local";
import Mkba from "../pages/dashboard/Mkba";
import Sdgs from "../pages/dashboard/Sdgs";
import Sectors from "../pages/dashboard/Sectors";
import Goals from "../pages/dashboard/Goals";
import Search from "../pages/dashboard/Search";
import Outputs from "../pages/dashboard/Outputs";
import Benchmark from "../pages/dashboard/Benchmark";
import Pillars from "../pages/dashboard/Pillars";
import Targetgroups from "../pages/dashboard/Targetgroups";
import Progress from "../pages/dashboard/Progress";
import Activities from "../pages/dashboard/Activities";
import Effects from "../pages/dashboard/Effects";
import Chat from "../pages/dashboard/Chat";
import TheoryOfChange from "../pages/dashboard/TheoryOfChange";

// Auth
import Profile from "../pages/auth/Profile";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Admin
import Newproject from "../pages/admin/Newproject";
import Settings from "../pages/admin/Settings";
import Team from "../pages/admin/Team";
import Userroles from "../pages/admin/Userroles";
import NewClient from "../pages/admin/Newclient";

const Navigation = () => {

    return (
      <Routes>
          <Route path={`/dashboard`} element={<Layout/>} >
            <Route exact path={`/dashboard/wall/:id`} element={<Wall/>}/>
            <Route exact path={`/dashboard/organisations/:id`} element={<Organisations/>}/>
            <Route exact path={`/dashboard/organisation/:id/:id`} element={<Organisation/>}/>
            <Route exact path={`/dashboard/discover/:id`} element={<Discover/>}/>
            <Route exact path={`/dashboard/local/:id`} element={<Local/>}/>
            <Route exact path={`/dashboard/mkbas/:id`} element={<Mkba/>}/>
            <Route exact path={`/dashboard/sdgs/:id`} element={<Sdgs/>}/>
            <Route exact path={`/dashboard/sectors/:id`} element={<Sectors/>}/>
            <Route exact path={`/dashboard/goals/:id`} element={<Goals/>}/>
            <Route exact path={`/dashboard/search/:id`} element={<Search/>}/>
            <Route exact path={`/dashboard/settings/:id/:id`} element={<Settings/>}/>
            <Route exact path={`/dashboard/outputs/:id`} element={<Outputs/>}/>
            <Route exact path={`/dashboard/targetgroups/:id`} element={<Targetgroups/>}/>
            <Route exact path={`/dashboard/benchmark/:id`} element={<Benchmark/>}/>
            <Route exact path={`/dashboard/pillars/:id`} element={<Pillars/>}/>
            <Route exact path={`/dashboard/progress/:id`} element={<Progress/>}/>
            <Route exact path={`/dashboard/activities/:id`} element={<Activities/>}/>
            <Route exact path={`/dashboard/effects/:id`} element={<Effects/>}/>
            <Route exact path={`/dashboard/chat/:id`} element={<Chat/>}/>
            <Route exact path={`/dashboard/theoryofchange/:id`} element={<TheoryOfChange/>}/>
          </Route>
          <Route path={`/`} >
              <Route exact path={`/`} element={<Login/>}/>
              <Route exact path={`/login`} element={<Login/>}/>
              <Route exact path={`/register/:id`} element={<Register/>}/>
              <Route exact path={`/newclient`} element={<NewClient/>}/>
          </Route>
          <Route path={`/profile`} element={<LayoutProfile/>}>
            <Route exact path={`/profile/profile/:id/:id`} element={<Profile/>}/>
            <Route exact path={`/profile/newproject/:id`} element={<Newproject/>}/>
            <Route exact path={`/profile/settings/:id`} element={<Settings/>}/>
             <Route exact path={`/profile/team/:id`} element={<Team/>}/>
              <Route exact path={`/profile/userroles/:id`} element={<Userroles/>}/>
          </Route>
      </Routes>
    )
  }
  
  export default Navigation