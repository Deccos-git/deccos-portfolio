import { Data } from "../../state/Data";
import { useContext } from "react";
import OutputsGraph from "../../components/outputs/OutputsGraph";
import OutputMilestones from "../../components/outputs/OutputMilestones";
import OutputOrganisations from "../../components/outputs/OutputOrganisations";

const Outputs = () => {
  const data = useContext(Data)

  return (
    <div className='page-container'>
        <div className='page-top-container'>
          <h1>Outputs</h1>
        </div>
        <div className='table-container'>
          <table>
            <tr>
                <th>OUTPUT</th>
                <th>VOORTGANG</th>
                <th>MIJLPALEN</th>
                <th>ORGANISATIE</th>
            </tr>
            {data[1] && data[1].map(item => (
                <tr key={item.ID} >
                  <td>
                      <p key={item.ID}>{item.Title}</p>  
                  </td>
                  <td>
                    <OutputsGraph item={item}/>  
                  </td>
                  <td>
                    <OutputMilestones item={item}/>  
                  </td>
                  <td>
                    <OutputOrganisations item={item}/>
                  </td>
              </tr>
            ))} 
          </table>
        </div>
    </div>
  )
}

export default Outputs