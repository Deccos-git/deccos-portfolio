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
import {updateDoc, doc, deleteDoc, setDoc, serverTimestamp} from "firebase/firestore";
import { db } from "../../firebase/config"
import ButtonClicked from "../../components/common/ButtonClicked"
import { useNavigate } from "react-router-dom";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Tooltip from '../../components/common/Tooltip'
import { v4 as uuid } from 'uuid';
import CompagnyMeta from "../../components/packages/CompagnyMeta"

const PairPackage = () => {
    const data = useContext(Data)

    const [compagnyId, setCompagnyId] = useState('')

    const projectKpis = data[1]
    const id = Location()[3]
    const packageId = Location()[4]

    const packages = useFirestoreGeneral('packages', 'id', packageId)
    const packageCompagnyPairs = useFirestoreGeneral('packageCompagnyPairs', 'packageId', packageId)


    const text = () => {
        return (
            <>
                <p>
                    <b>
                      Beheer de gekoppelde organisaties van het pakket '{packages.length > 0 ? packages[0].titel : 'Geen pakket gevonden'}'.
                    </b>
                </p>
            </>
        )
    }

    const settings = () => {
        return (
            <div className='table-container'>
                <p><b>Selecteer organisatie</b></p>
                <select onChange={selectCompagnyHandler}>
                    <option value="">-- Selecteer organisatie --</option>
                    {data[0] && data[0].map(item => (
                        <option key={item.ID} value={item.ID}>{item.CommunityName}</option>
                    ))}
                </select>
                <div className="button-container button-container-add-kpi">
                    <button onClick={addOrganisation}>Toevoegen</button>
                </div>
                <table>
                    <tr>
                        <th>ORGANISATIE</th>
                        <th>VERWIJDER</th>
                    </tr>
                    {packageCompagnyPairs && packageCompagnyPairs.map(item => (
                    <tr key={item.ID}>
                        <td>
                            <CompagnyMeta item={item} />
                        </td>
                        <td>
                            <Tooltip content='Organisatie verwijderen' width='80%' left='30px' top='-5px'>
                                <DeleteOutlineOutlinedIcon className="delete-icon" data-docid={item.docid} onClick={deleteOrganisation} />
                            </Tooltip>
                        </td>
                    </tr>
                    ))}
                </table>
            </div>
        )
    }

    const selectCompagnyHandler = (e) => {
        const compagnyId = e.target.value;

        setCompagnyId(compagnyId)
    }

    const addOrganisation = async (e) => {

        ButtonClicked(e, 'Toegevoegd')

        await setDoc(doc(db, "packageCompagnyPairs", uuid()), {
            compagny: id,
            title: '',
            packageId: packageId,
            compagnyId: compagnyId,
            createdAt: serverTimestamp(),
            id: uuid()
        });
    }

    const deleteOrganisation = async (e) => {
        const docid = e.target.dataset.docid

        await deleteDoc(doc(db, "packageCompagnyPairs", docid));    

    }

  return (
    <>
        <Navigation
        prev="Pakketten"
        prevLink="packages"
        />
        <Topbar 
        title={`Organisaties koppelen aan pakket '${packages.length > 0 ? packages[0].titel : 'Geen pakket gevonden'}'`} 
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

export default PairPackage