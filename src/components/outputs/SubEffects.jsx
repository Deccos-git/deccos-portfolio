import { useFirestoreGeneral } from "../../firebase/useFirestoreDeccos"

const SubEffects = ({effect}) => {

    const effects = useFirestoreGeneral('OutputEffects', 'Parent', effect.ID)

  return (
    <>
      {effects && effects.map(item => (
          <div key={item.ID}>
            <p>{item.Effect}</p>
            <p>--</p>
            <SubEffects effect={item}/>
          </div>
      ))}
    </>
  )
}

export default SubEffects