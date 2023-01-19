import { useNavigate } from "react-router-dom";
import { Data } from "../../state/Data";
import { useContext } from "react";
import ImpactSoftwareLink from "../../components/organisations/ImpactSoftwareLink";
import Goals from "../../components/organisations/Goals";

const Organisations = () => {
  const data = useContext(Data)

    const navigate = useNavigate()

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
                <th>DOELEN</th>
                <th>IMPACT DASHBOARD</th>
                <th>BEKIJK</th>
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
                    <Goals organisation={item}/>
                  </td>
                  <td>
                    <p>Bekijk</p>
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