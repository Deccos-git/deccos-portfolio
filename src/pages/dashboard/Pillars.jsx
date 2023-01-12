import plusIcon from '../../assets/icons/plus-icon.png'
import deleteIcon from '../../assets/icons/delete-icon.png'
import { db } from "../../firebase/config"
import { collection, addDoc, serverTimestamp, deleteDoc, doc } from "firebase/firestore"; 
import uuid from 'react-uuid';
import { client } from '../../helpers/Client';
import { useFirestoreCompagny } from '../../firebase/useFirestore';

const Pillars = () => {

  const id = client

  const sdgs = useFirestoreCompagny('sdgs')

  console.log(sdgs)

  const addSDG = async () => {

    await addDoc(collection(db, "sdgs"), {
      compagny: id,
      timestamp: serverTimestamp(),
      id: uuid(),
      sdg: ""
    });

  }

  const deleteSDG = async (e) => {

    const docid = e.target.dataset.docid

    await deleteDoc(doc(db, "sdgs", docid));

  }

  return (
    <div className='page-container'>
        <div className='page-top-container'>
            <h1>Impact pijlers</h1>
        </div>
        <div className='inner-page-container'>
          <div className='pillar-container'>
            <div className='pillar-title-container'>
              <h2>SDG's</h2>
              <img src={plusIcon} alt="" onClick={addSDG} />
            </div>
              <div className='table-container'>
                <table>
                    <tr>
                        <th>SDG</th>
                        <th>VERWIJDER</th>
                    </tr>
                    {sdgs && sdgs.map(item => (
                        <tr key={item.ID}>
                            <td>
                               <select name="" id="">
                                 <option value="">-- Selecteer een sdg --</option>
                               </select>
                            </td>
                            <td>
                                <img className='table-delete-icon' data-docid={item.docid} onClick={deleteSDG} src={deleteIcon} alt="" />
                            </td>
                        </tr>  
                    ))}
                </table>
              </div>
          </div>
          <div className='pillar-container'>
            <div className='pillar-title-container'>
              <h2>Sectoren</h2>
              <img className='add-pillar-button' src={plusIcon} alt="" />
            </div>
            <div></div>
          </div>
          <div className='pillar-container'>
            <div className='pillar-title-container'>
              <h2>Lokaal</h2>
              <img className='add-pillar-button' src={plusIcon} alt="" />
            </div>
          </div>
        </div>
    </div>
  )
}

export default Pillars