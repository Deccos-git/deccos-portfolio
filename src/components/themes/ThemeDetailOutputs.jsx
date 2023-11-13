import { useFirestoreGeneral } from "../../firebase/useFirestore"
import OutpuResults from "../outputs/OutputResults"
import OutputMeta from "../outputs/OutputMeta"

const ThemeDetailOutputs = ({item}) => {

    const outputs = useFirestoreGeneral('themeOutputs', 'themeId', item.id)

  return (
    <>
        {outputs && outputs.map(output => (
            <div key={output.id} className="package-builder-kpi-container">
                <div className="package-detail-kpi-selector-container">
                    <p><OutputMeta output={output.outputId}/></p>
                </div>
                <OutpuResults output={output}/>
            </div>
        ))}
    </>
  )
}

export default ThemeDetailOutputs