import { useFirestoreId } from '../../firebase/useFirestore'

const EffectMeta = ({effect}) => {

    const effects = useFirestoreId('effects', effect)

  return (
    <>
        {effects && effects.map(effect => (
            <p key={effect.id}>{effect.title}</p>
        ))}
    </>
  )
}

export default EffectMeta