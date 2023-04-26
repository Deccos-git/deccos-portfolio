import { useFirestoreGeneral } from "../../firebase/useFirestoreDeccos"
import Location from "../../helpers/Location";
import ProblemIcon from '@mui/icons-material/ExtensionOutlined';
import GoalIcon from '@mui/icons-material/FlagOutlined';
import GroupIcon from '@mui/icons-material/Groups2Outlined';
import ActivityIcon from '@mui/icons-material/MonitorHeartOutlined';
import EffectIcon from '@mui/icons-material/TurnSharpLeftOutlined';

const Organisation = () => {

    const compagnyId = Location()[4]

    const compagnies = useFirestoreGeneral('CompagnyMeta', 'CompagnyID', compagnyId ? compagnyId : '')
    const centralProblem = useFirestoreGeneral('CentralProblem', 'CompagnyID', compagnyId ? compagnyId : '')
    const goals = useFirestoreGeneral('Goals', 'CompagnyID', compagnyId ? compagnyId : '')
    const targetgroups = useFirestoreGeneral('Stakeholders', 'CompagnyID', compagnyId ? compagnyId : '')
    const activities = useFirestoreGeneral('Activities', 'CompagnyID', compagnyId ? compagnyId : '')
    const kpis = useFirestoreGeneral('OutputEffects', 'CompagnyID', compagnyId ? compagnyId : '')

    console.log(targetgroups)


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
                        <h2>Het probleem waar wij ons voor inzetten</h2>
                    </div>
                    {centralProblem && centralProblem.map(item => (
                        <p>{item.CentralProblem}</p>
                    ))}
                    <div className="report-section-title-container">
                        <GoalIcon/>
                        <h2>Ons doel</h2>
                    </div>
                    {goals && goals.map(item => (
                        <p>{item.Title}</p>
                    ))}
                </div>
                <div className="report-section-container-contrast">
                    <div className="report-section-title-container">
                        <GroupIcon/>
                        <h2>Voor wie we het doen</h2>
                    </div>
                    <div className="report-targetgroup-container">
                        {targetgroups && targetgroups.map(item => (
                            <div className="report-targetgroup-item-container">
                                <p>{item.Organisation}</p>
                            </div>
                        ))}
                    </div>
              
                </div>
                <div className="report-section">
                    <div className="report-section-title-container">
                        <ActivityIcon/>
                        <h2>Wat we doen</h2>
                    </div>
                    <div className="report-activities-container">
                        {activities && activities.map(item => (
                            <div className="report-activity-item-container">
                                <h3>{item.Activity}</h3>
                                {/* <ActivityOutput activity={item.ID}/> */}
                            </div>
                        ))}
                    </div>
                    
                </div>
                <div className="report-section-container-contrast">
                    <div className="report-section-title-container">
                        <EffectIcon/>
                        <h2>Wat we willen bereiken</h2>
                    </div>
                    {kpis && kpis.map(item => (
                        <div className="report-effect-data-item-container">
                            <h3>{item.Effect}</h3>
                            {/* <EffectData effect={item}/> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Organisation