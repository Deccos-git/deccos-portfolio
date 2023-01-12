import { useFirestoreCompagnyID } from "../../firebase/useFirestoreDeccos"
import CompagnyInfo from '../../components/Wall/CompagnyInfo'
import Congrats from "./Congrats";
import MilestoneTitle from "./MilestoneTitle";

const Milestones = ({item}) => {

    const options = { day: 'numeric', month: 'numeric', year: 'numeric'};

    const milestones = useFirestoreCompagnyID('Wall', item.ID) 

    console.log(milestones)

    const congratsButton = () => {

    }

  return (
    <div className='goal-container'>
        {milestones && milestones.map(milestone => (
            <div className='activity-card' key={milestone.ID}>
                <CompagnyInfo milestone={milestone}/>
                <MilestoneTitle milestone={milestone}/>
                <div className='milestone-flex-container'>
                    <p>{milestone.Timestamp.toDate().toLocaleDateString("nl-NL", options)}</p>
                </div>
                <div id='milestone-button-container'>
                    <button data-id={milestone.ID} onClick={congratsButton}>Feliciteer</button>
                    <Congrats milestone={milestone}/>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Milestones