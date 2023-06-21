import { useState } from "react"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { db } from "../../firebase/config"
import { doc, updateDoc } from "firebase/firestore";
import Tooltip from "../common/Tooltip";

const EffectTerm = ({item}) => {
    const [editTerm, setEditTerm] = useState(false)

    const termHandler = async (e) => {
        const docid = e.target.dataset.docid
        const value = e.target.options[e.target.selectedIndex].value

        await updateDoc(doc(db, "effects", docid), {
            term: value === 'short' ? 'Kort' : 'Lang',
        })

        setEditTerm(!editTerm)
    }

    const editTermHandler = (e) => {

        setEditTerm(!editTerm)

    }

  return (
    <div id="edit-effect-term-container">
        <div>
            <select data-docid={item.docid} onChange={termHandler} style={{display: editTerm ? 'block' : 'none'}}>
                <option value="short">Kort</option>
                <option value="long">Lang</option>
            </select>  
            <p style={{display: editTerm ? 'none' : 'block'}}>{item.term}</p>
        </div>
        <Tooltip content="Term aanpassen" top='-60px'>
            <EditOutlinedIcon className="table-icon" onClick={editTermHandler}/> 
        </Tooltip>
    </div>
  )
}

export default EffectTerm