import { client } from "../../helpers/Client";
import { useNavigate } from "react-router-dom";
import Mkbas from "../../components/mkba/Mkbas";
import { useEffect, useState } from "react";
import MkbaTitle from "../../components/mkba/MkbaTitle";
import MkbaTotals from "../../components/mkba/MkbaTotals";
import { Orgs } from "../../state/Organisations";
import { useContext } from "react";

const Mkba = () => {
  const organisations = useContext(Orgs)

  const [total, setTotal] = useState([])

  const id = client
  const navigate = useNavigate()

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
          {organisations && organisations[0].map(item => (
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