import { useFirestoreGeneral } from "../../firebase/useFirestore"
import OutputMeta from "../outputs/OutputMeta"
import OutputsTotal from "../../components/visualisations/OutputsTotal";
import ThemeOutputResults from "../data/ThemeOutputResults";

const ThemeDetailOutputs = ({item}) => {

    const themeOutputResults = ThemeOutputResults(item.id)

    const outputs = useFirestoreGeneral('themeOutputs', 'themeId', item.id)

  return (
    <>
        {outputs && outputs.map(output => (
            <div key={output.id} className="package-builder-kpi-container">
                <div className="package-detail-kpi-selector-container">
                    <p><OutputMeta output={output.outputId}/></p>
                </div>
                <OutputsTotal data={themeOutputResults}/>
            </div>
        ))}
    </>
  )
}

export default ThemeDetailOutputs