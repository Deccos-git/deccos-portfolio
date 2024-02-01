import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Location from '../../helpers/Location';
import { useFirestoreGeneral, useFirestoreGeneralTwo } from '../../firebase/useFirestore';
import Tooltip from "../../components/common/Tooltip";
import Modal from 'react-modal';
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config"
import { v4 as uuid } from 'uuid';

const Synchronisations = () => {

    // State
    const [compagnyName, setCompagnyName] = useState('')
    const [openModal, setModalOpen] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState([]);

    // Hooks
    const portfolioId = Location()[3]
    const compagnyId = Location()[4]
    Modal.setAppElement('#root');
    const modalStyles = {
        content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        },
    };

    // Firestore
    const synchronisations = useFirestoreGeneralTwo('Synchronisations', 'compagnyId', compagnyId, 'portfolioId', portfolioId)
    const outputs = useFirestoreGeneral('outputs', 'compagny', portfolioId)

    console.log(outputs)

    // Functions
    const addSynchronisation = async () => {

        await setDoc(doc(db, "synchronisations", uuid()), {
            portfolio: portfolioId,
            compagnyId: compagnyId,
            createdAt: serverTimestamp(),
            id: uuid(),
            position: synchronisations.length + 1
        });
    }

    const outputHandler = (event) => {
        const value = event.target.value;
        if (event.target.checked) {
          // Add the selected option to the array
          setSelectedOptions([...selectedOptions, value]);
        } else {
          // Remove the unselected option from the array
          setSelectedOptions(selectedOptions.filter(option => option !== value));
        }
    };



  return (
    <div className='page-container'>
    <div className='page-top-container'>
      <div className='page-header-title-container'>
        <SyncOutlinedIcon/>
        <h1>Synchronisaties</h1>
        <p>{compagnyId}</p>
      </div>
    </div>
    <div className='table-container'>
        <div className="add-icon-container">
            <Tooltip content='Synchronisatie toevoegen' width='80%' left='30px' top='-5px'>
                <AddCircleOutlineOutlinedIcon className="add-icon" onClick={() => setModalOpen(true)} />
            </Tooltip>
        </div>
      <table>
        <tr>
            <th>SYNCHRONISATIE</th>
            <th>STATUS</th>
            <th>VERWIJDEREN</th>
        </tr>
        {synchronisations && synchronisations.map(item => (
            <tr key={item.Id} >
              <td>
                  <p></p>  
              </td>
              <td>
               
              </td>
              <td>
        
              </td>
          </tr>
        ))} 
      </table>
    </div>
    <Modal
      isOpen={openModal}
      onRequestClose={openModal}
      style={modalStyles}
      contentLabel="Create synchronisation"
      >
        <div id='modal-container'>
          <div id='modal-title-container'>
            <SyncOutlinedIcon/>
            <h1>Creer synchronisatie</h1>
          </div>
         <div>
          <div>
            <p><b>Selecteer outputs</b></p>
            <div id='modal-input-container'>
            {outputs && outputs.map(item => (
                <div key={item.id}>
                <input
                    type="checkbox"
                    id={item.id}
                    name="outputOptions"
                    value={item.id}
                    checked={selectedOptions.includes(item.id)}
                    onChange={outputHandler}
                />
                <label htmlFor={item.id}>{item.title}</label>
                </div>
            ))}
           
          </div>
          <div id='modal-button-container'>
            <button id='modal-cancel-button' onClick={() => setModalOpen(false)}>Annuleren</button>
            <button onClick={addSynchronisation}>Opslaan</button>
          </div>

         </div>
        </div>
        </div>
    </Modal>
</div>
  )
}

export default Synchronisations