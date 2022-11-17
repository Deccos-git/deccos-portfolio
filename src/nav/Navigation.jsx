import { Routes, Route} from "react-router-dom";
import Location from "../helpers/Location"
import Layout from '../components/dashboard/Layout'
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Wall from "../pages/dashboard/Wall";
import NewClient from "../pages/admin/Newclient";
import Organisations from "../pages/dashboard/Organisations";
import Organisation from "../pages/dashboard/Organisation";
import Discover from "../pages/dashboard/Discover";
import Local from "../pages/dashboard/Local";
import Mkba from "../pages/dashboard/Mkba";
import Sdgs from "../pages/dashboard/Sdgs";
import Sectors from "../pages/dashboard/Sectors";
import Goals from "../pages/dashboard/Goals";
import Search from "../pages/dashboard/Search";
import Profile from "../pages/auth/Profile";
import Settings from "../pages/auth/Settings";
import Outputs from "../pages/dashboard/Outputs";
import Benchmark from "../pages/dashboard/Benchmark";

const Navigation = () => {

  const client = Location()[1]

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
            <Route exact path={`/dashboard/profile/:id/:id`} element={<Profile/>}/>
            <Route exact path={`/dashboard/settings/:id/:id`} element={<Settings/>}/>
            <Route exact path={`/dashboard/outputs/:id`} element={<Outputs/>}/>
            <Route exact path={`/dashboard/benchmark/:id`} element={<Benchmark/>}/>
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