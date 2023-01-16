import { useFirestoreEffects } from "../../firebase/useFirestoreDeccos"
import SubEffects from "./SubEffects"

const Effects = ({item}) => {

    const effects = useFirestoreEffects(item.CompagnyID)

    console.log(effects)

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

export default Effects