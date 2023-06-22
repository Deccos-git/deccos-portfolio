import { useFirestoreGeneral } from "../../firebase/useFirestore"
import OutpuResults from "../outputs/OutputResults"

const PackageDetailOutputs = ({item}) => {

    const outputs = useFirestoreGeneral('packageOutputs', 'packageId', item.id)

  return (
    <>
        {outputs && outputs.map(output => (
            <div key={output.id}>
                <div className="package-detail-kpi-selector-container">
                    <h3>Output</h3>
                    <p>{output.title}</p>
                </div>
                <div className="package-detail-kpi-selector-container">
                      <h3>Doel</h3>
                      <p>{output.goal}</p>
                  </div>
                  <div className="package-detail-kpi-selector-container">
                      <h3>Deadline</h3>
                        <p>{output.deadline}</p>
                  </div>
                <OutpuResults output={output}/>
            </div>
        ))}
    </>
  )
}

export default PackageDetailOutputs