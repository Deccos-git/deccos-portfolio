import Topbar from '../dashboard/Topbar'
import { Outlet } from 'react-router-dom'
import SidebarProfile from './SidebarProfile'

const LayoutProfile = () => {
  return (
    <div className="layout-container">
       <Topbar />
      <div id='sidebar-outlet-container'>
        <SidebarProfile/>
        <Outlet />
      </div>
    </div>
  )
}

export default LayoutProfile