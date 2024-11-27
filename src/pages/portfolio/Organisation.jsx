import Location from "../../helpers/Location";
import ProblemIcon from '@mui/icons-material/ExtensionOutlined';
import GoalIcon from '@mui/icons-material/FlagOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useEffect, useState } from "react";
import { functionsDeccos } from "../../firebase/configDeccos";
import { httpsCallable } from "firebase/functions";
import spinner from "../../assets/spinner-ripple.svg";

const Organisation = () => {
    const [projectTitle, setProjectTitle] = useState('')
    const [projectBanner, setProjectBanner] = useState('')
    const [projectLogo, setProjectLogo] = useState('')
    const [societalProblem, setSocietalProblem] = useState('')
    const [targetgroups, setTargetgroups] = useState([])
    const [activities, setActivities] = useState([])
    const [goal, setGoal] = useState([])
    const [loading, setLoading] = useState(true)

    const compagnyId = Location()[4]

    const projectName = async () => {

        const projectMeta = httpsCallable(functionsDeccos, 'projectMeta');

        await projectMeta({ data: compagnyId })
        .then((result) => {
            // Read result of the Cloud Function.
            setProjectTitle(result.data.CommunityName)
            setProjectBanner(result.data.ImpactBanner)
            setProjectLogo(result.data.Logo)
            setLoading(false)
        })
        .catch((error) => {
          // Handle errors
          console.error(error);
        });

    }

    const projectTheoryOfChange = async () => {

        const getProjectTheoryOfChange = httpsCallable(functionsDeccos, 'getProjectTheoryOfChange');

        await getProjectTheoryOfChange({ data: compagnyId })
        .then((result) => {
            // Read result of the Cloud Function.
            console.log(result.data);
            setSocietalProblem(result.data.problem)
            setTargetgroups(result.data.targetgroup)
            setGoal(result.data.goal)
            setActivities(result.data.activities)
            setLoading(false)
        })
        .catch((error) => {
          // Handle errors
          console.error(error);
        });
    }



    useEffect(() => {
        projectName()
        projectTheoryOfChange()
    }, [])

  return (
    <div className='page-container'>
        <div className="report-container">
            <div>
                <div>
                    {loading ? <img scr={spinner}/> : <img className="report-banner" src={projectBanner} alt="" />}
                    {loading ? <img scr={spinner}/> : <img className="report-logo" src={projectLogo} alt="" />}
                    {loading ? <img scr={spinner}/> : <h1 className="report-title">{projectTitle}</h1>}
                </div>
            </div>
            <div className="report-inner-container">
                <div className="report-section">
                    <div className="report-section-title-container">
                        <ProblemIcon/>
                        <h2>Maatschappelijk probleem</h2>
                    </div>
                    <p>{societalProblem}</p>

                    <div className="report-section-title-container">
                        <PersonOutlineOutlinedIcon/>
                        <h2>Doelgroep</h2>
                    </div>
                    <p>{targetgroups}</p>
                   
                    <div className="report-section-title-container">
                        <GoalIcon/>
                        <h2>Maatschappelijk doel</h2>
                    </div>
                    <p>{goal}</p>

                    <div className="report-section-title-container">
                        <GoalIcon/>
                        <h2>Activiteiten</h2>
                    </div>
                    <ul>
                        {activities && activities.map((activity, index) => (
                            <li key={index}>{activity}</li>
                        ))}
                    </ul>
                </div>
              
            </div>
        </div>
    </div>
  )
}

export default Organisation