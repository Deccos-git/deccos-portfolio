import { useFirestoreGeneral } from "../../firebase/useFirestore"
import Location from "../../helpers/Location"
import Tooltip from "../../components/common/Tooltip";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Settings } from '../../state/Settings';
import PhotoAlbumOutlinedIcon from '@mui/icons-material/PhotoAlbumOutlined';
import { doc, setDoc, updateDoc, serverTimestamp, deleteDoc, arrayUnion } from "firebase/firestore"; 
import { v4 as uuid } from 'uuid';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { db } from "../../firebase/config"
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';

const Themes = () => {
    // Context
    const [settings] = useContext(Settings)

    // Hooks
    const id = Location()[3]
    const navigate = useNavigate()
   
    // Firestore
    const themes = useFirestoreGeneral('themes', 'compagny', id)

    const compagnyProjectTable = () => {
        if(settings[0]?.compagnyProject === 'project'){
          return 'PROJECTEN'
        } else {
          return 'ORGANISATIES'
        }
      }

    const deleteTheme = async (e) => {
        const docid = e.target.dataset.docid

        await deleteDoc(doc(db, "themes", docid));
    }

    const addTheme = async (e) => {

        await setDoc(doc(db, "themes", uuid()), {
            compagny: id,
            titel: '',
            description: '',
            createdAt: serverTimestamp(),
            id: uuid(),
            position: themes.length + 1
        });
    }

    const themeTitleHandler = async (e) => {
        const docid = e.target.dataset.docid
        const value = e.target.value

        await updateDoc(doc(db, "themes", docid), {
            title: value,
        })
    }

  return (
    <div className='page-container'>
          <div className='page-top-container'>
            <div className='page-header-title-container'>
                <PhotoAlbumOutlinedIcon/>
                <h1>Thema's</h1>
            </div>
          </div>
           <div className='table-container'>
            <div className="add-icon-container">
                <Tooltip content='Thema toevoegen' width='80%' left='30px' top='-5px'>
                    <AddCircleOutlineOutlinedIcon className="add-icon" onClick={addTheme} />
                </Tooltip>
            </div>
            <table>
            <tr>
                <th>THEMA</th>
                <th>AANPASSEN</th>
                <th>VERWIJDEREN</th>
            </tr>
                {themes && themes.map(item => (
                <tr key={item.id}>
                    <td>
                        <input type="text" defaultValue={item.title} data-docid={item.docid} onChange={themeTitleHandler}/>
                    </td>
                    <td>
                        <Tooltip content='Thema aanpassen' width='80%' left='30px' top='-5px'>
                            <SettingsSuggestOutlinedIcon className='table-icon' onClick={() => navigate(`/dashboard/themedetail/${id}/${item.id}`)}/>
                        </Tooltip>
                    </td>
                    <td>
                        <Tooltip content='Thema verwijderen' width='80%' left='30px' top='-5px'>
                            <DeleteOutlineOutlinedIcon className="table-icon" data-docid={item.docid} onClick={deleteTheme} />
                        </Tooltip>
                    </td>
                </tr>
                ))}
            </table>
          </div>
      </div>
  )
}

export default Themes