import React from 'react'

const Topbar = ({title, icon}) => {
  return (
    <div id='guide-topbar-container'>
      {icon}
      <h1>{title}</h1>
    </div>
  )
}

export default Topbar