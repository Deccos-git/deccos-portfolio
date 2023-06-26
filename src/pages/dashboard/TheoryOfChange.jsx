import { useFirestoreGeneral, useFirestoreGeneralTwo } from "../../firebase/useFirestore"
import Location from '../../helpers/Location'
import NorthOutlinedIcon from '@mui/icons-material/NorthOutlined';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import OutputRoundedIcon from '@mui/icons-material/OutputRounded';
import DirectionsWalkOutlinedIcon from '@mui/icons-material/DirectionsWalkOutlined';

const TheoryOfChange = () => {

  const client = Location()[3]

  const goal = useFirestoreGeneral('goals', 'compagny', client)
  const activities = useFirestoreGeneral('activities', 'compagny', client)
  const outputs = useFirestoreGeneral('outputs', 'compagny', client)
  const effectsShort = useFirestoreGeneralTwo('effects', 'compagny', client, 'term', 'Kort')
  const effectsLong = useFirestoreGeneralTwo('effects', 'compagny', client, 'term', 'Lang')

  console.log(effectsShort)

  return (
    <div className='page-container'>
        <div className='page-top-container'>
        <h1>Theory of Change</h1>
        </div>
        <div className='table-container'>
          <div className="toc-container">

            <div className="toc-section-container">
              <div className="toc-section-title-container">
                <OutlinedFlagIcon className="toc-section-icon"/>
                <h2>Maatschappelijk doel</h2>
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
                <h2>Langetermijn effecten</h2>
              </div>
              
              {effectsLong && effectsLong.map((effect) => (
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
                <CompareArrowsOutlinedIcon className="toc-section-icon"/>
                <h2>Kortetermijn effecten</h2>
              </div>
              
              {effectsShort && effectsShort.map((effect) => (
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

            <div className="toc-arrow-up-container">
              <NorthOutlinedIcon/>
            </div>

            <div className="toc-section-container">
              <div className="toc-section-title-container">
                <DirectionsWalkOutlinedIcon className="toc-section-icon"/>
                <h2>Activiteiten</h2>
              </div>
              {activities && activities.map((activity) => (
                <div key={activity.id} className="toc-card">
                  <p>{activity.title}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
    </div>
  )
}

export default TheoryOfChange