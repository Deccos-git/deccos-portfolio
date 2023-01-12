import { Orgs } from "../../state/Organisations";
import { useContext } from "react";
import OutputTitle from "../../components/outputs/OutputTitle";

const Outputs = () => {
  const organisations = useContext(Orgs)

  return (
    <div className='page-container'>
        <div className='page-top-container'>
          <h1>Outputs</h1>
        </div>
        <div className='banner-container'>
          <table>
            <tr>
                <th>TITEL</th>
                <th>ACTIVITEIT</th>
                <th>MAATSCHAPPELIJK DOEL</th>
                <th>VOORTGANG</th>
                <th>ORGANISATIE</th>
            </tr>
            {organisations[0] && organisations[0].map(item => (
              <tr key={item.ID}>
                <td>
                  <OutputTitle organisation={item}/>  
                </td>
                <td>
                  {/* <OutputActivity organisation={item}/>   */}
                </td>
                <td>
                  {/* <OutputActivity organisation={item}/>   */}
                </td>
                <td>
                  {/* <OutputActivity organisation={item}/>   */}
                </td>
                <td>
                  <p>{item.CommunityName}</p>
                </td>
              </tr>
            ))}
           </table>
        </div>
    </div>
  )
}

export default Outputs