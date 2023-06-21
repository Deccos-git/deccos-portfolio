import { useFirestoreGeneral } from "../../firebase/useFirestore"
import PackageOutputs from "../../components/packages/PackageOutputs"
import KpiMetaPackage from "../../components/packages/KpiMetaPackage";
import PackageCompagnyPairCount from "../../components/packages/PackageCompagnyPairCount";
import Location from "../../helpers/Location"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Tooltip from "../../components/common/Tooltip";
import { useNavigate } from "react-router-dom";

const Packages = () => {

    const id = Location()[3]
    const navigate = useNavigate()

    const packages = useFirestoreGeneral('packages', 'compagny', id)

  return (
    <div className='page-container'>
          <div className='page-top-container'>
            <h1>Thema's</h1>
          </div>
           <div className='table-container'>
           <table>
                <tr>
                    <th>THEMA</th>
                    <th>OMSCHRIJVING</th>
                    <th>OUTPUTS</th>
                    <th>KPI'S</th>
                    <th>GEKOPPELDE ORGANISATIES</th>
                    <th>DETAILS</th>
                </tr>
                    {packages && packages.map(item => (
                    <tr key={item.id}>
                        <td>
                            <p>{item.titel}</p>
                        </td>
                        <td>
                           <p>{item.description}</p>
                        </td>
                        <td>
                            <PackageOutputs id={item.id} />
                        </td>
                        <td>
                            {item.kpis && item.kpis.map(item => (
                                <ul>
                                    <li>
                                        <KpiMetaPackage item={item}/>
                                    </li>
                                </ul>
                            ))}
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