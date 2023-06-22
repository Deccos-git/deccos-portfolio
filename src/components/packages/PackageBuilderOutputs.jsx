import { useFirestoreGeneral } from "../../firebase/useFirestore"
import OutpuResults from "../outputs/OutputResults"
import { updateDoc, doc } from "firebase/firestore"
import { db } from "../../firebase/config"

const PackageBuilderOutputs = ({item}) => {

    const outputs = useFirestoreGeneral('packageOutputs', 'packageId', item.id)

    const outputGoalHandler = async (e) => {
      const value = e.target.value
      const docid = e.target.dataset.docid

      await updateDoc(doc(db, "packageOutputs", docid), {
          goal: value,
      })
  }

  const deadlineHandler = async (e) => {

      const value = e.target.value
      const docid = e.target.dataset.docid

      await updateDoc(doc(db, "packageOutputs", docid), {
          deadline: value,
      })
  }

  return (
    <>
        {outputs && outputs.map(output => (
            <div key={output.id}>
                <p>{output.title}</p>
                <div className="package-builder-kpi-selector-container">
                      <h3>Doel</h3>
                      <input type="number" data-docid={output.docid} defaultValue={output.goal} onChange={outputGoalHandler} />
                  </div>
                  <div className="package-builder-kpi-selector-container">
                      <h3>Deadline</h3>
                      <input type="date" data-docid={output.docid} defaultValue={output.deadline} onChange={deadlineHandler} />
                  </div>
                <OutpuResults output={output}/>
            </div>
        ))}
    </>
  )
}

export default PackageBuilderOutputs