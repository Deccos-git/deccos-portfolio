import { useFirestoreGeneral } from "../../firebase/useFirestoreDeccos"

const Goals = ({organisation}) => {

    console.log(organisation)

    const goals = useFirestoreGeneral('Goals', 'CompagnyID', organisation.CompagnyID)

  return (
    <>
        {goals && goals.map(item => (
            <ul key={item.ID}>
                <li>
                    {item.Title}
                </li>
            </ul>
        ))}
    </>
  )
}

export default Goals