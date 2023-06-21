import { useFirestoreGeneral } from '../../firebase/useFirestore'
import Location from '../../helpers/Location'
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';

const Goal = () => {
    const client = Location()[3]
  
    const goals  = useFirestoreGeneral('goals', 'compagny', client)
  
    return (
      <div className='page-container'>
          <div className='page-top-container'>
          <h1>Maatschappelijk doel</h1>
          </div>
           <div className='table-container'>
            <div className="toc-section-container">
                <div className="toc-section-title-container">
                    <OutlinedFlagIcon className="toc-section-icon"/>
                    <h2>Maatschappelijk doel</h2>
                </div>
                {goals && goals.map((goal) => (
                    <p key={goal.id}>{goal.title}</p>
                ))}
            </div>
          </div>
      </div>
    )
}

export default Goal