import { useFirestoreGeneral } from "../../firebase/useFirestoreDeccos"

const OutputActivity = ({item}) => {
  
    const activities = useFirestoreGeneral('Activities', 'ID', item.ActivityID)

  return (
    <>
      {activities && activities.map(item => (
        <p key={item.ID}>{item.Activity}</p>
      ))}
    </>
  )
}

export default OutputActivity