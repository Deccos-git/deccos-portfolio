import {useFirestoreCompagnyID} from '../../firebase/useFirestoreDeccos'

const OutputTitle = ({organisation}) => {

  const outputs = useFirestoreCompagnyID('Outputs', organisation.ID)
  return (
    <>
      {outputs && outputs.map(item => (
        <p key={item.ID}>{item.Title}</p>
      ))}
    </>
  )
}

export default OutputTitle