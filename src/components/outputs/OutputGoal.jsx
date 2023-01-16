import { useFirestoreGeneral } from "../../firebase/useFirestoreDeccos"

const OutputGoal = ({item}) => {

    const activities = useFirestoreGeneral('Activities', 'ID', item.ActivityID)

    const Goals = ({activity}) => {

        const goals = useFirestoreGeneral('Goals', 'ID', activity.GoalID)

        return(
            <>
            {goals && goals.map(item => (
                <p key={item.ID}>{item.Title}</p>
            ))}
            </>
        )
    }

  return (
    <>
      {activities && activities.map(item => (
        <Goals key={item.ID} activity={item}/>
      ))}
    </>
  )
}

export default OutputGoal