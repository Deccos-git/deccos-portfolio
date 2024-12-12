import { useFirestoreGeneralTwo } from '../../firebase/useFirestore'
import Location from '../../helpers/Location'
import Tooltip from "../../components/common/Tooltip";
import { doc, setDoc, updateDoc, serverTimestamp, deleteDoc } from "firebase/firestore"; 
import { db } from "../../firebase/config"
import { v4 as uuid } from 'uuid';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useState } from 'react';
import AddItemRow from '../../components/common/AddItemRow';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from "react-router-dom";

const AddIndicators = () => {

    // Hooks
    const client = Location()[3]
    const effectId = Location()[4]
    const navigate = useNavigate()

    // Firestore
    const indicators  = useFirestoreGeneralTwo('indicators', 'companyId', client ? client : '', 'effectId', effectId ? effectId : '')

    // Handle title change
    const titleHandler = async (e) => {
        const docid = e.target.dataset.docid

        await updateDoc(doc(db, "indicators", docid), {
            title: e.target.value,
        })
    }

    // Delete indicator
    const deleteIndicator = async (e) => {
        const docid = e.target.dataset.docid

        console.log(e.target.dataset)

        await deleteDoc(doc(db, "indicators", docid))
    }

  return (
    <div className='page-container'>
        <div className='page-top-container'>
          <div className='page-header-title-container'>
            <h1>Indicatoren</h1>
          </div>
        </div>
        <div>
            <table>
                <tr>
                    <th>INDICATOR</th>
                    <th>TYPE</th>
                    <th>AANPASSEN</th>
                    <th>VERWIJDEREN</th>
                </tr>
                {indicators && indicators.map(item => (
                    <tr key={item.id}>
                    <td>
                        <input type="text" defaultValue={item.question} data-docid={item.docid} onChange={titleHandler} placeholder="Noteer hier je indicator" />
                    </td>
                    <td>
                        <p>{item.questionType}</p>
                    </td>
                    <td>
                        <Tooltip content='Effect aanpassen' width='80%' left='30px' top='-5px'>
                            <EditOutlinedIcon onClick={() => navigate(`/impactstrategy/indicatordetails/${client}/${effectId}/${item.id}`)}/>
                        </Tooltip>
                    </td>
                    <td>
                        <Tooltip content='Effect verwijderen' width='80%' left='30px' top='-5px'>
                            <DeleteOutlineOutlinedIcon className="delete-icon" data-docid={item.docid} onClick={deleteIndicator} />
                        </Tooltip>
                    </td>
                    </tr>
                ))}
            </table>
            <AddItemRow content='Indicator toevoegen' onClick={() => navigate(`/impactstrategy/indicatordetails/${client}/${effectId}/${null}`)} />
        </div>
    </div>
  )
}

export default AddIndicators