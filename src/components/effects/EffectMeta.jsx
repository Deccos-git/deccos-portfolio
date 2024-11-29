import { useFirestoreGeneral } from '../../firebase/useFirestore'

const EffectMeta = ({effect}) => {

    const effects = useFirestoreGeneral('effects', 'id', effect)

  return (
    <>
        {effects && effects.map(effect => (
            <p key={effect.id}>{effect.title}</p>
        ))}
    </>
  )
}

export default EffectMeta