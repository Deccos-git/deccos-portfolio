import { useNavigate } from "react-router-dom";
import { Data } from "../../state/Data";
import { useContext } from "react";
import ImpactSoftwareLink from "../../components/organisations/ImpactSoftwareLink";
import Location from '../../helpers/Location';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Tooltip from "../../components/common/Tooltip";
import { Settings } from '../../state/Settings';
import CompagnyPackage from "../../components/organisations/CompagnyPackage";


const Organisations = () => {
  const data = useContext(Data)
  const [settings] = useContext(Settings)

    const navigate = useNavigate()
    const id = Location()[3]

    const compagnyProject = () => {
      if(settings[0]?.compagnyProject === 'project'){
        return 'Projecten'
      } else {
        return 'Organisaties'
      }
    }

    const compagnyProjectTable = () => {
      if(settings[0]?.compagnyProject === 'project'){
        return 'PROJECT'
      } else {
        return 'ORGANISATIE'
      }
    }

  return (
    <div className='page-container'>
        <div className='page-top-container'>
          <h1>{compagnyProject()}</h1>
        </div>
        <div className='table-container'>
          <table>
            <tr>
                <th>LOGO</th>
                <th>{compagnyProjectTable()}</th>
                <th>THEMA</th>
                <th>DETAILS</th>
                {/* <th>IMPACT SOFTWARE</th> */}
            </tr>
            {data[0] && data[0].map(item => (
                <tr key={item.ID} >
                  <td>
                      <img className='organisations-overview-logo' src={item.Logo} alt="" />
                  </td>
                  <td>
                      <p>{item.CommunityName}</p>  
                  </td>
                  <td>
                      <CompagnyPackage item={item} />
                  </td>
                  <td>
                    <Tooltip content='Details bekijken' top='-60px'>
                      <SearchOutlinedIcon className="table-icon" onClick={() => navigate(`/dashboard/organisation/${id}/${item.CompagnyID}`)}/>
                    </Tooltip>
                  </td>
                  {/* <td>
                    <Tooltip content='Link naar impact management software' top='-60px'>
                      <ImpactSoftwareLink compagny={item}/>
                    </Tooltip>
                  </td> */}
              </tr>
            ))} 
          </table>
        </div>
    </div>
  )
}

export default Organisations