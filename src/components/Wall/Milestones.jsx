import { useFirestoreMilstones } from "../../firebase/useFirestoreDeccos"
import CompagnyInfo from '../../components/Wall/CompagnyInfo'
import Congrats from "./Congrats";

const Milestones = ({item}) => {

    const options = { day: 'numeric', month: 'numeric', year: 'numeric'};

    const milestones = useFirestoreMilstones(item.ID) 

    console.log(milestones)

    const congratsButton = () => {

    }

  return (
    <div className='goal-container'>
        {milestones && milestones.map(milestone => (
            <div className='activity-card' key={milestone.ID}>
                <CompagnyInfo milestone={milestone}/>
                <div className='milestone-flex-container'>
                    <h3>{milestone.Number} {milestone.Title} </h3> 
                    <p className='mg-r-10'>bij activiteit </p> 
                    <h3> {milestone.Activity}</h3>
                </div>
                <div className='milestone-flex-container'>
                    <p>behaald op</p>
                    <p>{milestone.SuccesDate.toDate().toLocaleDateString("nl-NL", options)}</p>
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