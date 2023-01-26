import { Data } from "../../state/Data";
import { useContext } from "react";
import OrganisationMeta from "../../components/common/OrganisationMeta";

const Targetgroups = () => {
    const data = useContext(Data)
    
  return (
    <div className='page-container'>
        <div className='page-top-container'>
          <h1>Doelgroepen</h1>
        </div>
        <div className='table-container'>
          <table>
            <tr>
                <th>DOELGROEP</th>
                <th>ORGANISATIE</th>
            </tr>
            {data[2] && data[2].map(item => (
                <tr key={item.ID} >
                  <td>
                      <p key={item.ID}>{item.Name}</p>  
                  </td>
                  <td>
                    <OrganisationMeta item={item}/>
                  </td>
              </tr>
            ))} 
          </table>
        </div>
    </div>
  )
}

export default Targetgroups