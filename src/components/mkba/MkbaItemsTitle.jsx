import { useFirestoreMkbaTotal } from "../../firebase/useFirestoreDeccos"

const MkbaItemsTitle = ({mkbaSet}) => {
    const mkbaItems = useFirestoreMkbaTotal(mkbaSet.ID, 'benefit')

  return (
    <div>
      {mkbaItems && mkbaItems.map(item => (
        <p key={item.ID}>{item.Title}</p>
      ))}
    </div>
  )
}

export default MkbaItemsTitle