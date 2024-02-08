import { useFirestoreGeneral } from '../../firebase/useFirestore'
import Location from '../../helpers/Location'
import Tooltip from "../../components/common/Tooltip";
import { db } from "../../firebase/config"
import { doc, setDoc, updateDoc, serverTimestamp, deleteDoc } from "firebase/firestore"; 
import { useEffect, useState } from "react"
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { v4 as uuid } from 'uuid';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import OutputOutlinedIcon from '@mui/icons-material/OutputOutlined';

const Outputs = () => {

  // State
  const [activityId, setActivityId] = useState('')

  // Hooks
  const id = Location()[3]

  // Firestore
  const outputs = useFirestoreGeneral('outputs', 'compagny', id)

  // Update output title
  const outputHandler = async (e) => {
    const docid = e.target.dataset.docid

    await updateDoc(doc(db, "outputs", docid), {
        title: e.target.value,
      })
  }

  // Add new output
  const addOutput = async () => {

      await setDoc(doc(db, "outputs", uuid()), {
          compagny: id,
          title: '',
          activityId: activityId,
          createdAt: serverTimestamp(),
          id: uuid(),
          position: outputs.length + 1
      });
  }

  // Delete output
  const deleteOutput = async (e) => {
      const docid = e.target.dataset.docid

      await deleteDoc(doc(db, "outputs", docid))
  }

  return (
    <div className='page-container'>
        <div className='page-top-container'>
          <div className='page-header-title-container'>
            <OutputOutlinedIcon/>
            <h1>Outputs</h1>
          </div>
        </div>
          <div className='table-container'>
            <div className="add-icon-container">
                <Tooltip content='Output toevoegen' width='80%' left='30px' top='-5px'>
                    <AddCircleOutlineOutlinedIcon className="add-icon" onClick={addOutput} />
                </Tooltip>
            </div>
          <table>
            <tr>
                <th>OUTPUT</th>
                <th>VERWIJDEREN</th>
            </tr>
              {outputs && outputs.map(item => (
                <tr key={item.id}>
                  <td>
                      <input type="text" defaultValue={item.title} data-docid={item.docid} onChange={outputHandler} placeholder="Noteer hier je output" />
                  </td>
                  <td>
                      <Tooltip content='Output verwijderen' width='80%' left='30px' top='-5px'>
                          <DeleteOutlineOutlinedIcon className="delete-icon" data-docid={item.docid} onClick={deleteOutput} />
                      </Tooltip>
                  </td>
                </tr>
              ))}
          </table>
        </div>
    </div>
  )
}

export default Outputs