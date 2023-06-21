import Topbar from "../../components/guide/Topbar"
import Navigation from "../../components/guide/Navigation"
import Instructions from "../../components/guide/Instructions"
import Settings from "../../components/guide/Settings"
import Location from "../../helpers/Location"
import { db } from "../../firebase/config"
import { useFirestoreGeneral } from "../../firebase/useFirestore"
import { doc, setDoc, updateDoc, serverTimestamp, deleteDoc, arrayUnion } from "firebase/firestore"; 
import { useState } from "react"
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Tooltip from '../../components/common/Tooltip'
import { v4 as uuid } from 'uuid';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import { useNavigate } from "react-router-dom";
import KpiMeta from "../../components/kpis/KpiMeta"
import PackageOutputs from "../../components/packages/PackageOutputs"
import KpiMetaPackage from "../../components/packages/KpiMetaPackage";
import PackageCompagnyPairCount from "../../components/packages/PackageCompagnyPairCount";

const Packages = () => {

    const [output, setOutput] = useState('')
    const [kpi, setKpi] = useState('')

    const id = Location()[3]
    const navigate = useNavigate()

    const packages = useFirestoreGeneral('packages', 'compagny', id)
    const kpis = useFirestoreGeneral('kpis', 'compagny', id)
    const packageCompagnyPairs = useFirestoreGeneral('packageCompagnyPairs', 'compagnyId', id)

    const text = () => {
        return (
            <>
                <p>
                    <b>
                     Stel thema's samen waar organisaties zich aan kunnen verbinden.
                    </b>
                </p>
            </>
        )
    }

    const deletePackage = async (e) => {
        const docid = e.target.dataset.docid

        await deleteDoc(doc(db, "packages", docid));
    }

    const addPackage = async (e) => {

        await setDoc(doc(db, "packages", uuid()), {
            compagny: id,
            titel: '',
            description: '',
            createdAt: serverTimestamp(),
            id: uuid()
        });
    }

    const packageTitleHandler = async (e) => {
        const docid = e.target.dataset.docid
        const value = e.target.value

        await updateDoc(doc(db, "packages", docid), {
            titel: value,
        })
    }

    const descriptionHandler = async (e) => {
        const docid = e.target.dataset.docid
        const value = e.target.value

        await updateDoc(doc(db, "packages", docid), {
            description: value,
        })
    }

    const outputHandler = async (e) => {
        const value = e.target.value

        setOutput(value)
    }

    const addOutput = async (e) => {
        const packageId = e.target.dataset.packageid

        await setDoc(doc(db, "packageOutputs", uuid()), {
            compagny: id,
            title: output,
            packageId: packageId,
            createdAt: serverTimestamp(),
            id: uuid()
        });
    }

    const kpiHandler = async (e) => {
        const value = e.target.options[e.target.selectedIndex].value

        setKpi(value)
    }

    const addKpi = async (e) => {
        const docid = e.target.dataset.docid

        console.log(kpi, docid)

        await updateDoc(doc(db, "packages", docid), {
            kpis: arrayUnion(kpi),
        })
    }

    const settings = () => {
        return (
            <div className='table-container'>
                <div className="add-icon-container">
                    <Tooltip content='Pakket toevoegen' width='80%' left='30px' top='-5px'>
                        <AddCircleOutlineOutlinedIcon className="add-icon" onClick={addPackage} />
                    </Tooltip>
                </div>
                <table>
                <tr>
                    <th>THEMA</th>
                    <th>OMSCHRIJVING</th>
                    <th>OUTPUTS</th>
                    <th>KPI'S</th>
                    <th>GEKOPPELDE ORGANISATIES</th>
                    <th>VERWIJDEREN</th>
                </tr>
                    {packages && packages.map(item => (
                    <tr key={item.id}>
                        <td>
                            <input type="text" defaultValue={item.titel} data-docid={item.docid} onChange={packageTitleHandler}/>
                        </td>
                        <td>
                           <textarea name="" id="" cols="30" rows="3" data-docid={item.docid} defaultValue={item.description} onChange={descriptionHandler}></textarea>
                        </td>
                        <td>
                            <div id='add-package-output-container'>
                                <input type="text" onChange={outputHandler} placeholder="Output title"/>
                                <Tooltip content='Output toevoegen' width='10%' left='30px' top='-5px'>
                                    <AddCircleOutlineOutlinedIcon className="add-icon" data-packageid={item.id} onClick={addOutput} />
                                </Tooltip>
                            </div>
                            <PackageOutputs id={item.id} />
                        </td>
                        <td>
                            <div id='add-package-output-container'>
                                <select name="" id="" onChange={kpiHandler}>
                                    <option value="">-- Selecteer KPI --</option>
                                    {kpis && kpis.map(item => (
                                        <option value={item.id}><KpiMeta kpi={item}/></option>
                                    ))}
                                </select>
                                <Tooltip content='KPI toevoegen' width='10%' left='30px' top='-5px'>
                                    <AddCircleOutlineOutlinedIcon className="add-icon" data-docid={item.docid} onClick={addKpi} />
                                </Tooltip>
                            </div>
                            {item.kpis && item.kpis.map(item => (
                                <ul>
                                    <li>
                                        <KpiMetaPackage item={item}/>
                                    </li>
                                </ul>
                            ))}
                        </td>
                        <td>
                            <div id='package-compagny-pair-container'>
                                <Tooltip content='Beheer koppelingen' width='80%' left='30px' top='-5px'>
                                    <LinkOutlinedIcon className="table-icon" onClick={() => navigate(`/guide/pairpackage/${id}/${item.id}`)}  />
                                </Tooltip>
                                <PackageCompagnyPairCount id={item.id} />
                            </div>
                            
                        </td>
                        <td>
                            <Tooltip content='Kpi verwijderen' width='80%' left='30px' top='-5px'>
                                <DeleteOutlineOutlinedIcon className="delete-icon" data-docid={item.docid} onClick={deletePackage} />
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
        prev="Kpis"
        prevLink="kpis"
        next="Organisaties"
        nextLink="organisations"
        />
        <Topbar 
        title="Thema's" 
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

export default Packages