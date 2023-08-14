import { useFirestoreGeneralTwo } from "../../firebase/useFirestoreDeccos"
import OutputMetaProject from "../outputs/OutputMetaProject"

const PairedOutputs = ({theme, compagnyId}) => {

    const pairedCompagnyOutputs = useFirestoreGeneralTwo('PairedOutputs', 'ThemeId', theme, 'CompagnyID', compagnyId)

  return (
    <>
        {pairedCompagnyOutputs && pairedCompagnyOutputs.map(item => (
            <div key={item.id}>
                <OutputMetaProject id={item.Output}/>
            </div>
        ))}
    </>
  )
}

export default PairedOutputs