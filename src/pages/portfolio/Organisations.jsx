import { useNavigate } from "react-router-dom";
import { Data } from "../../state/Data";
import { useContext } from "react";
import Location from '../../helpers/Location';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Tooltip from "../../components/common/Tooltip";
import { Settings } from '../../state/Settings';
import CorporateFareRoundedIcon from '@mui/icons-material/CorporateFareRounded';
import plusIcon from '../../assets/icons/plus-icon.png'
import SynchronisationCount from '../../components/synchronisations/SynchronisationCount';

const Organisations = () => {
  // Context
  const data = useContext(Data)
  const [settings] = useContext(Settings)

  // Hooks
    const navigate = useNavigate()
    const id = Location()[3]

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
          <div className='page-header-title-container'>
            <CorporateFareRoundedIcon/>
            <h1>Portfolio</h1>
          </div>
        </div>
        <div className='table-container section-container'>
          <table>
            <tr>
                <th>{compagnyProjectTable()}</th>
                <th>SYNCHRONISATIES</th>
                <th>DETAILS</th>
            </tr>
            {data && data[0]?.map(item => (
                <tr key={item.ID} >
                  <td onClick={() => navigate(`/portfolio/organisation/${id}/${item.CompagnyID}`)}>
                      <p>{item.CommunityName}</p>  
                  </td>
                  <td>
                    <div id='compagnies-them-table-cell-container' onClick={() => navigate(`/portfolio/synchronisations/${id}/${item.CompagnyID}`)}>
                      <SynchronisationCount compagnyId={item.CompagnyID} />
                      <Tooltip content='Synchronisatie toevoegen' top='-60px'>
                        <img src={plusIcon} alt=""/>
                      </Tooltip>
                    </div>
                  </td>
                  <td>
                    <Tooltip content='Details bekijken' top='-60px'>
                      <SearchOutlinedIcon className="table-icon" onClick={() => navigate(`/portfolio/organisation/${id}/${item.CompagnyID}`)}/>
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