import { useFirestoreOrganisations } from "../../firebase/useFirestoreDeccos"
import Location from "../../helpers/Location"
import { useNavigate } from "react-router-dom";
import Mkbas from "../../components/mkba/Mkbas";
import { useEffect, useState } from "react";
import MkbaTitle from "../../components/mkba/MkbaTitle";
import MkbaTotals from "../../components/mkba/MkbaTotals";

const Mkba = () => {

  const [total, setTotal] = useState(0)
  const id = Location()[3]
  const navigate = useNavigate()

  const organisations = useFirestoreOrganisations(id) 

  console.log(total)

  return (
    <div className='page-container'>
        <div className='page-top-container'>
          <h1>MKBAs</h1>
        </div>
      <div className='banner-container'>
      <div className='table-container'>
        <table>
            <tr>
                <th>TITEL</th>
                <th>TOTALE BATEN</th>
                <th>ORGANISATIE</th>
                <th>DETAILS</th>
            </tr>
          {organisations && organisations.map(item => (
            <tr key={item.ID}>
              <td>
                <MkbaTitle organisation={item}/>
              </td>
              <td>
                <MkbaTotals organisation={item} setTotal={setTotal} total={total}/>
              </td>
              <td>
                <p className='cursor' onClick={() => navigate(`/dashboard/organisation/${id}/${item.CompagnyID}`) }>{item.CommunityName}</p>
              </td>
              <td>
                <p className='cursor'>Bekijk</p>
              </td>
            </tr>
          ))}
          <tr className='total-row'>
            <td>
                <p>Totaal</p>
            </td>
            <td>{total}</td>
            <td></td>
            <td></td>
          </tr>
        </table>
    </div>
      </div>
    </div>
  )
}

export default Mkba