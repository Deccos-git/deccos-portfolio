import { Routes, Route} from "react-router-dom";
import Layout from '../components/dashboard/Layout'
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Wall from "../pages/dashboard/Wall";
import NewClient from "../pages/admin/Newclient";

const Navigation = () => {
    return (
      <Routes>
          <Route path={`/dashboard`} element={<Layout/>} >
            <Route exact path={`/dashboard/wall/:id`} element={<Wall/>}/>
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