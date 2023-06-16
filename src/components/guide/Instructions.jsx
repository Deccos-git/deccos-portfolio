import React from 'react'

const Instructions = ({text}) => {
  return (
    <div id='guide-instructions-container'>
        <div className='guide-section-title-container'>
            <h2>Uitleg</h2>
            {text}
        </div>
    </div>
  )
}

export default Instructions