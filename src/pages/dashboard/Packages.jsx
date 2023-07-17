import { useFirestoreGeneral } from "../../firebase/useFirestore"
import PackageCompagnyPairCount from "../../components/packages/PackageCompagnyPairCount";
import Location from "../../helpers/Location"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Tooltip from "../../components/common/Tooltip";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Settings } from '../../state/Settings';
import PhotoAlbumOutlinedIcon from '@mui/icons-material/PhotoAlbumOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';

const Packages = () => {
    const [settings] = useContext(Settings)

    const id = Location()[3]
    const navigate = useNavigate()
   
    const packages = useFirestoreGeneral('packages', 'compagny', id)

    const compagnyProjectTable = () => {
        if(settings[0]?.compagnyProject === 'project'){
          return 'PROJECTEN'
        } else {
          return 'ORGANISATIES'
        }
      }

  return (
    <div className='page-container'>
          <div className='page-top-container'>
            <div className='page-header-title-container'>
                <PhotoAlbumOutlinedIcon/>
                <h1>Thema's</h1>
            </div>
            <Tooltip content={`Thema's aanpassen`} top='-60px'>
                <AutoFixHighOutlinedIcon className='page-edit-icon' onClick={() => navigate(`/guide/packages/${id}`)}/>
            </Tooltip>
          </div>
           <div className='table-container'>
           <table>
                <tr>
                    <th>THEMA</th>
                    <th>GECOMMITTEERDE {compagnyProjectTable()}</th>
                    <th>DETAILS</th>
                </tr>
                    {packages && packages.map(item => (
                    <tr key={item.id}>
                        <td>
                            <p>{item.title}</p>
                        </td>
                        <td>
                            <PackageCompagnyPairCount id={item.id} />
                        </td>
                        <td>
                            <Tooltip content='Details bekijken' top='-50px'>
                                <SearchOutlinedIcon className="table-icon" onClick={() => navigate(`/dashboard/packagedetail/${id}/${item.id}`)}/>
                            </Tooltip>
                        </td>
                    </tr>
                    ))}
                </table>
          </div>
      </div>
  )
}

export default Packages