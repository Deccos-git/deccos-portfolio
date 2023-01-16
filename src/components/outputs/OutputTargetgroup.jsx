import { useFirestoreGeneral } from "../../firebase/useFirestoreDeccos"

const OutputTargetgroup = ({item}) => {

    const activities = useFirestoreGeneral('Activities', 'ID', item.ActivityID)

    const Goals = ({activity}) => {

        const goals = useFirestoreGeneral('Goals', 'ID', activity.GoalID)

        const Targetgroups = ({goal}) => {

            const targetgroups = useFirestoreGeneral('Targetgroups', 'GoalID', goal.ID)

            return(
                <>
                {targetgroups && targetgroups.map(item => (
                    <p key={item.ID}>{item.Name}</p>
                ))}
                </>
            )
        }

        return(
            <>
            {goals && goals.map(item => (
                <Targetgroups goal={item}/>
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

export default OutputTargetgroup