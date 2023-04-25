import Location from "../../helpers/Location";
import { useFirestoreGeneral } from '../../firebase/useFirestore'
import uuid from 'react-uuid';
import PlusIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { doc, setDoc, serverTimestamp, arrayUnion, updateDoc, deleteDoc } from "firebase/firestore"; 
import { db } from "../../firebase/config";
import { useState } from "react";

const EffectsSettings = () => {
  const [showMore, setShowMore] = useState('block')

  const client = Location()[3]

  const compagny = useFirestoreGeneral('compagnies', 'id', client)

  const effects = useFirestoreGeneral('effects', 'compagny', client)

  const addEffect = async () => {
  
    await setDoc(doc(db, "effects", uuid()), {
      compagny: client,
      effect: '',
      stakeholders: [],
      timestamp: serverTimestamp(),
      id: uuid(),
      kpi: false,
    })
  }

  const effectHandler = async (e) => {
    const docid = e.target.dataset.docid
    const value = e.target.value

    await updateDoc(doc(db, "effects", docid), {
      effect: value
    })
  }

  const kpiHandler = async (e) => {
    const docid = e.target.dataset.docid
    const value = e.target.options[e.target.selectedIndex].value

    await updateDoc(doc(db, "effects", docid), {
      kpi: value
    })
  }

  const addChildEffect = async (e) => {
    const id = e.target.dataset.id

    await setDoc(doc(db, "effects", uuid()), {
      compagny: client,
      effect: '',
      stakeholders: [],
      timestamp: serverTimestamp(),
      id: uuid(),
      kpi: false,
      parent: id,
    })
  }

  const deleteEffect = async (e) => {
    const docid = e.target.dataset.docid

    await deleteDoc(doc(db, "effects", docid))
  }

  return (
    <div className='page-container'>
    <div className='page-top-container'>
        <h1>Effecten</h1>
    </div>
      <div className='settings-container'>
        {compagny && compagny.map(item => (
          <h2>Effecten van {item.compagny}</h2>
        ))}
      </div> 
      <div>
        <div className='list-container list-container-wizard'>
            <div className='list-top-row-container'>
                <PlusIcon onClick={addEffect}/>
                {/* <CreateSuggestion id={'effects'} prompt={prompt} setAiAnswer={setAiAnswer}/> */}
            </div>
            <div className='table-container'>
                {effects && effects.map(effect => (
                    <div className='effects-container' key={effect.ID} >
                        <div className='effects-inner-container'>
                            <p><b>Effect</b></p>
                            <div className="effect-title-container">
                                <input type="text" data-docid={effect.docid} defaultValue={effect.effect} placeholder='Geef het effect een titel' onChange={effectHandler}/>
                                {/* <img className="show-more-icon-effects-items-wizard" src={downIcon} alt="" onClick={() => showMore === 'block' ? setShowMore('none') : setShowMore('block')}/> */}
                            </div>
                            <div className=' effects-meta-container' style={{display: showMore}}>
                                {/* <div className='effects-meta-item-container'>
                                    <p><b>Stakeholders</b></p>
                                    <div>
                                        <div className="effect-meta-select-stakeholder-container"> 
                                            <select name="" id="" data-docid={effect.docid} onChange={stakeholderHandler} defaultValue={effect.Stakeholder}>
                                                <option value="">-- Selecteer stakeholder --</option>
                                                {stakeholders && stakeholders.map( item => (
                                                    <option key={item.ID} value={item.docid}>{item.Organisation}</option>
                                                ))}
                                            </select>
                                            <button className="button-simple" onClick={addStakeholder} data-id={effect.ID}>Toevoegen</button>
                                        </div>
                                        <EffectStakeholders effect={effect.ID}/>
                                    </div>
                                </div> */}
                                <div className='effects-meta-item-container'>
                                    <p><b>KPI</b></p>
                                    <select name="" id="" data-docid={effect.docid} onChange={kpiHandler} defaultValue={effect.kpi}>
                                        <option value="">-- Selecteer ja/nee --</option>
                                        <option value='true'>Ja</option>
                                        <option value="false">Nee</option>
                                    </select>
                                </div>
                                <div className='effects-meta-item-container'>
                                    <p><b>Voeg een subeffect toe</b></p>
                                    <PlusIcon data-id={effect.ID} onClick={addChildEffect}/>
                                </div> 
                                <div className='effects-meta-item-container'>
                                    <p><b>Verwijder</b></p>
                                    <DeleteIcon data-docid={effect.docid} onClick={deleteEffect}/>
                                </div>
                            </div>
                        </div>
                        {/* <SubEffect id={effect.ID}/> */}
                    </div>
                ))}
            </div>
        </div>
    </div>
  </div> 
  )
}

export default EffectsSettings