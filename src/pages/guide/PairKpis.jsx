import Topbar from "../../components/guide/Topbar"
import Navigation from "../../components/guide/Navigation"
import Instructions from "../../components/guide/Instructions"
import Settings from "../../components/guide/Settings"
import Location from "../../helpers/Location"
import { Data } from "../../state/Data";
import { useContext, useState } from "react";
import { useFirestoreGeneral } from "../../firebase/useFirestore"
import OrganisationMeta from "../../components/common/OrganisationMeta"
import { useEffect } from "react"
import {updateDoc, doc} from "firebase/firestore";
import { db } from "../../firebase/config"
import ButtonClicked from "../../components/common/ButtonClicked"
import { useNavigate } from "react-router-dom";

const PairEffects = () => {
    const data = useContext(Data)

    const [selectedKpis, setSelectedKpis] = useState([])
    const [effectId, setEffectId] = useState('')
    const [kpiDocid, setKpiDocid] = useState('')

    const projectKpis = data[1]
    const id = Location()[3]
    const kpiId = Location()[4]
    const navigate = useNavigate()

    const kpis = useFirestoreGeneral('kpis', 'id', kpiId)
    const effects = useFirestoreGeneral('effects', 'id', effectId)

    // Set kpiDocid
    useEffect(() => {
        kpis.length > 0 ? setKpiDocid(kpis[0].docid) : setKpiDocid('')
    }, [kpis])

    // Set effectId for effect title
    useEffect(() => {
        kpis.length > 0 ? setEffectId(kpis[0].effectId) : setEffectId('')
    }, [kpis])

    const text = () => {
        return (
            <>
                <p>
                    <b>
                      Koppel de resultaten van de KPI's van de projecten/prganisaties aan het KPI '{effects.length > 0 ? effects[0].title : 'Geen KPI gevonden'}'.
                    </b>
                </p>
            </>
        )
    }

    const settings = () => {
        return (
            <div className='table-container'>
                <table>
                <tr>
                    <th>SELECTEER</th>
                    <th>KPI</th>
                    <th>ORGANISATIE</th>
                </tr>
                    {projectKpis && projectKpis.map(item => (
                    <tr key={item.id}>
                        <td>
                            <input type="checkbox" data-id={item.ID} onChange={selectKpiHandler}/>
                        </td>
                        <td>
                            <p>{item.Effect}</p>
                        </td>
                        <td>
                            <OrganisationMeta item={item}/>
                        </td>
                    </tr>
                    ))}
                </table>
                <div className="button-container">
                    <button onClick={pairKpis}>Koppelen</button>
                </div>
            </div>
        )
    }

    const selectKpiHandler = (e) => {
        const kpiId = e.target.dataset.id;
        const isChecked = e.target.checked;
      
        if (isChecked) {
          setSelectedKpis([...selectedKpis, kpiId]);
        } else {
          setSelectedKpis(selectedKpis.filter((id) => id !== kpiId));
        }

    }

    const pairKpis = async (e) => {

        ButtonClicked(e, 'Gekoppeld')

        await updateDoc(doc(db, "kpis", kpiDocid), {
            pairedKpis: selectedKpis
        })

        navigate(`/guide/kpis/${id}`)
    }

  return (
    <>
        <Navigation
        prev="Kpis"
        prevLink="kpis"
        />
        <Topbar 
        title={`KPIs koppelen aan '${effects.length > 0 ? effects[0].title : 'Geen KPI gevonden'}'`} 
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

export default PairEffects