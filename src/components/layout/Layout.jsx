import Topbar from './Topbar'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const Layout = () => {
  return (
    <div id="layout-container">
      <Sidebar/>
      <div id='page-outer-container'>
        <Topbar />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout