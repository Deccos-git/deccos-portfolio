import { Data } from "../../state/Data";
import { useContext } from "react";
import OrganisationMeta from "../../components/common/OrganisationMeta";

const Goals = () => {
  const data = useContext(Data)

  return (
    <div className='page-container'>
        <div className='page-top-container'>
          <h1>Maatschappelijke doelen</h1>
        </div>
        <div className='table-container'>
          <table>
            <tr>
                <th>MAATSCHAPPELIJK DOEL</th>
                <th>ORGANISATIE</th>
            </tr>
            {data[4] && data[4].map(item => (
                <tr key={item.ID} >
                  <td>
                      {item.Title}
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

export default Goals