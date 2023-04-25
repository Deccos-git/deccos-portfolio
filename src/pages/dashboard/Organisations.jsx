import { useNavigate } from "react-router-dom";
import { Data } from "../../state/Data";
import { useContext } from "react";
import ImpactSoftwareLink from "../../components/organisations/ImpactSoftwareLink";
import Location from '../../helpers/Location';

const Organisations = () => {
  const data = useContext(Data)

    const navigate = useNavigate()
    const id = Location()[3]

  return (
    <div className='page-container'>
        <div className='page-top-container'>
          <h1>Organisaties</h1>
        </div>
        <div className='table-container'>
          <table>
            <tr>
                <th>LOGO</th>
                <th>ORGANISATIE</th>
                <th>IMPACT DASHBOARD</th>
                <th>IMPACT SOFTWARE</th>
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
                    <p onClick={() => navigate(`/dashboard/organisation/${id}/${item.CompagnyID}`)}>Bekijk</p>
                  </td>
                  <td>
                    <ImpactSoftwareLink compagny={item}/>
                  </td>
              </tr>
            ))} 
          </table>
        </div>
    </div>
  )
}

export default Organisations