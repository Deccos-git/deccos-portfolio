import { useFirestoreGeneral } from "../../firebase/useFirestoreDeccos"

const ListMeta = ({id}) => {

  const items = useFirestoreGeneral('Goals', 'ID', id)

  return (
    <>
        {items && items.map(item => (
            <p className='milestone-title' key={item.ID}><b>{item.Title}</b></p>
        ))}
      </>
  )
}

export default ListMeta