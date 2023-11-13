import { useFirestoreGeneralTwo } from "../../firebase/useFirestoreDeccos"
import EffectMeta from "../effects/EffectMeta"

const PairedEffects = ({theme, compagnyId}) => {

    const pairedCompagnyEffects = useFirestoreGeneralTwo('PairedEffects', 'ThemeId', theme, 'CompagnyID', compagnyId)

  return (
    <>
        {pairedCompagnyEffects && pairedCompagnyEffects.map(item => (
            <div key={item.id}>
                <EffectMeta id={item.effectId} compagnyId={compagnyId}/>
            </div>
        ))}
    </>
  )
}

export default PairedEffects