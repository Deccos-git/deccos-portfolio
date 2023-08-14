import { useFirestoreGeneral as useFirestoreGeneralDeccos } from "../../firebase/useFirestoreDeccos"
import { useFirestoreGeneral } from "../../firebase/useFirestore"
import Location from "../../helpers/Location";
import ProblemIcon from '@mui/icons-material/ExtensionOutlined';
import GoalIcon from '@mui/icons-material/FlagOutlined';
import GroupIcon from '@mui/icons-material/Groups2Outlined';
import ActivityIcon from '@mui/icons-material/MonitorHeartOutlined';
import EffectIcon from '@mui/icons-material/TurnSharpLeftOutlined';
import ThemeMeta from "../../components/themes/ThemeMeta";
import PairedOutputs from "../../components/themes/PairedOutputs";
import PairedKPIs from "../../components/themes/PairedKPIs";

const Organisation = () => {

    const compagnyId = Location()[4]

    const compagnies = useFirestoreGeneralDeccos('CompagnyMeta', 'CompagnyID', compagnyId ? compagnyId : '')
    const centralProblem = useFirestoreGeneralDeccos('CentralProblem', 'CompagnyID', compagnyId ? compagnyId : '')
    const goals = useFirestoreGeneralDeccos('Goals', 'CompagnyID', compagnyId ? compagnyId : '')
    const themeCompagnyPairs = useFirestoreGeneral('themeCompagnyPairs', 'compagnyId', compagnyId ? compagnyId : '')

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
                <div className="report-section-container">
                    <div className="report-section-title-container">
                        <GroupIcon/>
                        <h2>Pakket</h2>
                    </div>
                    <div className="report-package-container">
                        {themeCompagnyPairs && themeCompagnyPairs.map(item => (
                            <div key={item.id}>
                                <ThemeMeta item={item} />
                                <div id='organisation-detail-theme-pairs-container'>
                                    <h3>Gekoppelde outputs</h3>
                                    <PairedOutputs theme={item.themeId} compagnyId={compagnyId}/>
                                    <h3>Gekoppelde KPI's</h3>
                                    <PairedKPIs theme={item.themeId} compagnyId={compagnyId}/>
                                </div>
                                
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Organisation