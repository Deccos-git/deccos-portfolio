import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';

const Instructions = ({text}) => {
  return (
    <div className='guide-section-container'>
        <div className='guide-section-title-container'>
            <div className='guide-section-title-container'>
              <SchoolOutlinedIcon/>
              <h2>Uitleg</h2>
            </div>
        </div>
        {text}
    </div>
  )
}

export default Instructions