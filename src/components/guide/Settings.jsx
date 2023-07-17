import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';

const Settings = ({settings}) => {
  return (
    <div className='guide-section-container'>
      <div className='guide-section-title-container'>
          <div className='guide-section-title-container'>
            <RocketLaunchOutlinedIcon/>
            <h2>Aan de slag</h2>
          </div>
      </div>
      {settings}
    </div>
  )
}

export default Settings