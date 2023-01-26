import { Data } from "../../state/Data";
import { useContext } from "react";
import OrganisationMeta from "../../components/common/OrganisationMeta";

const Effects = () => {
  const data = useContext(Data)

  return (
    <div className='page-container'>
        <div className='page-top-container'>
        <h1>Effecten</h1>
        </div>
         <div className='table-container'>
          <table>
            <tr>
                <th>EFFECTEN</th>
                <th>ORGANISATIE</th>
            </tr>
            {data[6] && data[6].map(item => (
                <tr key={item.ID} >
                  <td>
                      {item.Effect}
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

export default Effects