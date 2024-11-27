import { useFirestoreGeneral, useFirestoreGeneralTwo } from "../../firebase/useFirestore"
import Location from '../../helpers/Location'
import NorthOutlinedIcon from '@mui/icons-material/NorthOutlined';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import OutputRoundedIcon from '@mui/icons-material/OutputRounded';
import DirectionsWalkOutlinedIcon from '@mui/icons-material/DirectionsWalkOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';

const TheoryOfChange = () => {

  const client = Location()[3]

  const goal = useFirestoreGeneral('goals', 'compagny', client)
  const activities = useFirestoreGeneral('activities', 'compagny', client)
  const outputs = useFirestoreGeneral('outputs', 'compagny', client)
  const effects = useFirestoreGeneral('effects', 'compagny', client)

  return (
    <div className='page-container'>
        <div className='page-top-container'>
          <div className='page-header-title-container'>
            <TrendingUpOutlinedIcon/>
            <h1>Theory of Change</h1>
          </div>
        </div>
        <div className='table-container'>
          <div className="toc-container">

            <div className="toc-section-container">
              <div className="toc-section-title-container">
                <OutlinedFlagIcon className="toc-section-icon"/>
                <h2>Impact doel</h2>
              </div>
              {goal && goal.map((goal) => (
                <div key={goal.id} className="toc-card">
                  
                  <p>{goal.title}</p>
                </div>
              ))}
            </div>

            <div className="toc-arrow-up-container">
              <NorthOutlinedIcon/>
            </div>
            
            <div className="toc-section-container">
              <div className="toc-section-title-container">
                <CompareArrowsOutlinedIcon className="toc-section-icon"/>
                <h2>Effecten</h2>
              </div>
              
              {effects&& effects.map((effect) => (
                <div key={effect.id} className="toc-card">
                  <p>{effect.title}</p>
                </div>
              ))}
            </div>

            <div className="toc-arrow-up-container">
              <NorthOutlinedIcon/>
            </div>
              
            <div className="toc-section-container">    
              <div className="toc-section-title-container">
                <OutputRoundedIcon className="toc-section-icon"/>
                <h2>Outputs</h2>
              </div>
              {outputs && outputs.map((output) => (
                <div key={output.id} className="toc-card">
                  <p>{output.title}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
    </div>
  )
}

export default TheoryOfChange