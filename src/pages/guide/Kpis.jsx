import Topbar from "../../components/guide/Topbar"
import Navigation from "../../components/guide/Navigation"
import Instructions from "../../components/guide/Instructions"
import Settings from "../../components/guide/Settings"
import Location from "../../helpers/Location"
import { db } from "../../firebase/config"
import { useFirestoreGeneral } from "../../firebase/useFirestore"
import { doc, setDoc, updateDoc, serverTimestamp, deleteDoc } from "firebase/firestore"; 
import { useEffect, useState } from "react"
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Tooltip from '../../components/common/Tooltip'
import { v4 as uuid } from 'uuid';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import { Data } from "../../state/Data";
import { useNavigate } from "react-router-dom";
import KpiMeta from "../../components/kpis/KpiMeta"

const Kpis = () => {
    const [effectId, setEffectId] = useState('')

    const id = Location()[3]
  
    const navigate = useNavigate()
  
    const effects = useFirestoreGeneral('effects', 'compagny', id)
    const kpis = useFirestoreGeneral('kpis', 'compagny', id)
  
    const text = () => {
        return (
            <>
                <p>
                    <b>
                      Markeer effecten als KPI die je nauwkeurig wilt volgen en wilt onderbouwen met resulaten en onderzoeken.
                    </b>
                </p>
            </>
        )
    }

    const effectHandler = (e) => {
        const effect = e.target.options[e.target.selectedIndex].value
        setEffectId(effect)
    }
  
    const kpiHandler = async (e) => {
        const docid = e.target.dataset.docid
  
        await updateDoc(doc(db, "kpi", docid), {
            title: e.target.value,
          })
    }
  
    const addKpi = async () => {
  
        await setDoc(doc(db, "kpis", uuid()), {
            compagny: id,
            title: '',
            effectId: effectId,
            createdAt: serverTimestamp(),
            id: uuid()
        });
    }
  
    const deleteKpi = async (e) => {
        const docid = e.target.dataset.docid
  
        await deleteDoc(doc(db, "kpis", docid))
    }
  
  
    const settings = () => {
        return (
            <div className='table-container'>
                <div>
                    <p><b>Selecteer een effect</b></p>
                    <select name="" id="" onChange={effectHandler}>
                        <option value="">-- Selecteer effect --</option>
                        {effects && effects.map(item => (
                            <option value={item.id}>{item.title}</option>
                        ))}
                    </select>
                    <div className="button-container button-container-add-kpi">
                        <button onClick={addKpi}>Voeg toe</button>
                    </div>
                </div>
            <table>
              <tr>
                  <th>KPI</th>
                  <th>KPIS KOPPELEN</th>
                  <th>VERWIJDEREN</th>
              </tr>
                {kpis && kpis.map(item => (
                  <tr key={item.id}>
                    <td>
                        <KpiMeta kpi={item} />
                    </td>
                    <td>
                        <div id='pair-kpi-container'>
                            <Tooltip content='Kpi koppelen van projecten/organisaties' width='60%' left='30px' top='-5px'>
                                <LinkOutlinedIcon className="table-icon" onClick={() => navigate(`/guide/pairkpis/${id}/${item.id}`)}/>
                            </Tooltip>
                            <p>Koppelingen: {item.pairedKpis ? item.pairedKpis.length : 0}</p>
                        </div>
                        
                    </td>
                    <td>
                        <Tooltip content='Kpi verwijderen' width='80%' left='30px' top='-5px'>
                            <DeleteOutlineOutlinedIcon className="delete-icon" data-docid={item.docid} onClick={deleteKpi} />
                        </Tooltip>
                    </td>
                  </tr>
                ))}
            </table>
          </div>
        )
    }
  
  
    return (
      <>
          <Navigation
          prev="Effecten"
          prevLink="effects"
          />
          <Topbar 
          title="Kpis" 
          />
          <Instructions
          text={text()}
          />
          <Settings
          settings={settings()}
          />
      </>
    )
}

export default Kpis