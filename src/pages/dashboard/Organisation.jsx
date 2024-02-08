import { useFirestoreGeneral as useFirestoreGeneralDeccos } from "../../firebase/useFirestoreDeccos"
import { useFirestoreGeneral } from "../../firebase/useFirestore"
import Location from "../../helpers/Location";
import ProblemIcon from '@mui/icons-material/ExtensionOutlined';
import GoalIcon from '@mui/icons-material/FlagOutlined';
import GroupIcon from '@mui/icons-material/Groups2Outlined';

const Organisation = () => {

    const compagnyId = Location()[4]

    const compagnies = useFirestoreGeneralDeccos('CompagnyMeta', 'CompagnyID', compagnyId ? compagnyId : '')
    const centralProblem = useFirestoreGeneralDeccos('CentralProblem', 'CompagnyID', compagnyId ? compagnyId : '')
    const goals = useFirestoreGeneralDeccos('Goals', 'CompagnyID', compagnyId ? compagnyId : '')

  return (
    <div className='page-container'>
        <div className="report-container">
            <div>
                {compagnies && compagnies.map(item => (
                    <div>
                        <img className="report-banner" src={item.ImpactBanner} alt="" />
                        <img className="report-logo" src={item.Logo} alt="" />
                        <h1 className="report-title">{item.CommunityName}</h1>
                    </div>
                    
                ))}
            </div>
            <div className="report-inner-container">
                <div className="report-section">
                    <div className="report-section-title-container">
                        <ProblemIcon/>
                        <h2>Maatschappelijk probleem</h2>
                    </div>
                    {centralProblem && centralProblem.map(item => (
                        <p>{item.CentralProblem}</p>
                    ))}
                    <div className="report-section-title-container">
                        <GoalIcon/>
                        <h2>Maatschappelijk doel</h2>
                    </div>
                    {goals && goals.map(item => (
                        <p>{item.Title}</p>
                    ))}
                </div>
              
            </div>
        </div>
    </div>
  )
}

export default Organisation