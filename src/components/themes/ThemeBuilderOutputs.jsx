import { useFirestoreGeneral } from "../../firebase/useFirestore"
import OutpuResults from "../outputs/OutputResults"
import { updateDoc, doc, deleteDoc } from "firebase/firestore"
import { db } from "../../firebase/config"
import OutputMeta from "../outputs/OutputMeta"
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Tooltip from "../common/Tooltip"

const ThemeBuilderOutputs = ({item}) => {

    const packages = useFirestoreGeneral('themeOutputs', 'themeId', item.id)

    const outputGoalHandler = async (e) => {
      const value = e.target.value
      const docid = e.target.dataset.docid

      await updateDoc(doc(db, "themeOutputs", docid), {
          goal: value,
      })
  }

    const deletePackageOutput = async (e) => {
        const docid = e.target.dataset.docid

        await deleteDoc(doc(db, "themeOutputs", docid))
    }


  return (
    <>
        {packages && packages.map(item => (
            <div key={item.id} className="package-builder-kpi-container">
                <h3><OutputMeta output={item.outputId}/></h3>
                <div className="package-builder-kpi-selector-container">
                      <h3>Doel</h3>
                      <input type="number" data-docid={item.docid} defaultValue={item.goal} onChange={outputGoalHandler} />
                  </div>
                <OutpuResults output={item}/>
                <Tooltip content='Verwijderen' top='-60px'>
                    <DeleteOutlineOutlinedIcon data-docid={item.docid} onClick={deletePackageOutput} className='delete-icon'/>
                </Tooltip>
            </div>
        ))}
    </>
  )
}

export default ThemeBuilderOutputs