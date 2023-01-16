import { useFirestoreGeneral } from "../../firebase/useFirestoreDeccos"
import MilestoneProgress from "../milestones/MilestoneProgress"

const OutputMilestones = ({item}) => {

    const milestones = useFirestoreGeneral('Milestones', 'OutputID', item.ID)

  return (
      <>
      {milestones && milestones.map(milestone => (
        <MilestoneProgress milestone={milestone}/>
      ))}
      </>
  )
}

export default OutputMilestones