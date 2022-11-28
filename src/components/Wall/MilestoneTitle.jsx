import MilestoneMeta from "./MilestoneMeta"

const MilestoneTitle = ({milestone}) => {

    if(milestone.Type === 'goal-set'){
        return (
            <>
                <p>heeft een nieuw doel gesteld</p>
                <MilestoneMeta id={milestone.GoalID}/>
            </>
        )
    } else {
        return (
            <p></p>
          )
    }
  
}

export default MilestoneTitle