import { useNavigate } from "react-router-dom";
import { Data } from "../../state/Data";
import { useContext } from "react";
import Location from '../../helpers/Location';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Tooltip from "../../components/common/Tooltip";
import { Settings } from '../../state/Settings';
import CompagnyTheme from "../../components/organisations/CompagnyTheme";
import CorporateFareRoundedIcon from '@mui/icons-material/CorporateFareRounded';
import plusIcon from '../../assets/icons/plus-icon.png'

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

    console.log(data[0])

  return (
    <div className='page-container'>
        <div className='page-top-container'>
          <div className='page-header-title-container'>
            <CorporateFareRoundedIcon/>
            <h1>{compagnyProject()}</h1>
          </div>
        </div>
        <div className='table-container'>
          <table>
            <tr>
                <th>{compagnyProjectTable()}</th>
                <th>THEMA</th>
                <th>DETAILS</th>
            </tr>
            {data[0] && data[0].map(item => (
                <tr key={item.ID} >
                  <td>
                      <p>{item.CommunityName}</p>  
                  </td>
                  <td>
                    <div id='compagnies-them-table-cell-container'>
                      <div onClick={() => navigate(`/dashboard/themeconnecter/${id}/${item.CompagnyID}`)}>
                        <CompagnyTheme companyId={item.CompagnyID} portfolioId={id} />
                      </div>
                      <Tooltip content='Thema koppelen' top='-60px'>
                        <img src={plusIcon} alt="" onClick={() => navigate(`/dashboard/themeconnecter/${id}/${item.CompagnyID}`)}/>
                      </Tooltip>
                    </div>
                  </td>
                  <td>
                    <Tooltip content='Details bekijken' top='-60px'>
                      <SearchOutlinedIcon className="table-icon" onClick={() => navigate(`/dashboard/organisation/${id}/${item.CompagnyID}`)}/>
                    </Tooltip>
                  </td>
              </tr>
            ))} 
          </table>
        </div>
    </div>
  )
}

export default Organisations