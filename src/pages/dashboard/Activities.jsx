import { Data } from "../../state/Data";
import { useContext } from "react";
import OrganisationMeta from "../../components/common/OrganisationMeta";

const Activities = () => {
  const data = useContext(Data)

  return (
    <div className='page-container'>
        <div className='page-top-container'>
        <h1>Activiteiten</h1>
        </div>
        <div className='table-container'>
          <table>
            <tr>
                <th>ACTIVITEIT</th>
                <th>ORGANISATIE</th>
            </tr>
            {data[5] && data[5].map(item => (
                <tr key={item.ID} >
                  <td>
                      {item.Activity}
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

export default Activities