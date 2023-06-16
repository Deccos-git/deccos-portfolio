import Topbar from '../dashboard/Topbar'
import { Outlet } from 'react-router-dom'
import Sidebar from '../dashboard/Sidebar'

const Layout = ({title}) => {
  return (
    <div className="layout-container">
       <Topbar />
      <div id='sidebar-outlet-container'>
        <Sidebar/>
        <div id='guide-container'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout