import { Data } from "../../state/Data";
import { useContext } from "react";

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
                <th>ACTIVITEITEN</th>
                <th>MAATSCHAPPELIJK DOEL</th>
                <th>ORGANISATIE</th>
            </tr>
            {data[2] && data[2].map(item => (
                <tr key={item.ID} >
                  <td>
                      <p key={item.ID}>{item.Name}</p>  
                  </td>
                  <td>
                    {/* <Activities item={item}/>   */}
                  </td>
                  <td>
                    {/* <OutputMilestones output={item}/>   */}
                  </td>
                  <td>
                    {/* <Organisations item={item}/> */}
                  </td>
              </tr>
            ))} 
          </table>
        </div>
    </div>
  )
}

export default Targetgroups