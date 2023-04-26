import { useFirestoreGeneral } from '../../firebase/useFirestore'
import Location from '../../helpers/Location'
import { Data } from "../../state/Data";

const Effects = () => {

  const client = Location()[3]
  
  const effects  = useFirestoreGeneral('effects', 'compagny', client)

  return (
    <div className='page-container'>
        <div className='page-top-container'>
        <h1>Effecten</h1>
        </div>
         <div className='table-container'>
          <table>
            <tr>
                <th>EFFECTEN</th>
                <th>DETAILS</th>
            </tr>
              {effects && effects.map(item => (
                <tr key={item.ID} >
                  <td>
                      <p>{item.effect}</p>
                  </td>
                  <td>
                      <p></p>
                  </td>
                </tr>
              ))}
          </table>
        </div>
    </div>
  )
}

export default Effects