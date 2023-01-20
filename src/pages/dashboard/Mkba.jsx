import Location from "../../helpers/Location";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MkbaTotalBenefits from "../../components/mkba/MkbaTotalBenefits";
import MkbaTotalCosts from "../../components/mkba/MkbaTotalCosts";
import MkbaOrganisations from "../../components/mkba/MkbaOrganisations";
import { Data } from "../../state/Data";
import { useContext } from "react";

const Mkba = () => {
  const data = useContext(Data)

  const [totalBenefits, setTotalBenefits] = useState(0)
  const [totalCosts, setTotalCosts] = useState(0)

  const id = Location()[3]
  const navigate = useNavigate()

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
                  <th>TOTALE KOSTEN</th>
                  <th>W/V</th>
                  <th>SROI</th>
                  <th>ORGANISATIE</th>
                  <th>DETAILS</th>
              </tr>
            {data && data[3].map(item => (
              <tr key={item.ID}>
                <td>
                  <p>{item.Title}</p>
                </td>
                <td>
                  <MkbaTotalBenefits key={item.ID} mkbaSet={item} setTotal={setTotalBenefits} total={totalBenefits}/>
                </td>
                <td>
                  <MkbaTotalCosts key={item.ID} mkbaSet={item} setTotal={setTotalCosts} total={totalCosts}/>
                </td>
                <td>
                  {/* <MkbaItemsTotal key={item.ID} mkbaSet={item} setTotal={setTotal} total={total}/> */}
                </td>
                <td>
                  {/* <MkbaItemsTotal key={item.ID} mkbaSet={item} setTotal={setTotal} total={total}/> */}
                </td>
                <td>
                  <MkbaOrganisations mkbaSet={item}/>
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
              <td>{totalBenefits}</td>
              <td>{totalCosts}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr className='total-row'>
              <td>
                  <p>Claimbare kosten/baten</p>
              </td>
              <td>{totalBenefits}</td>
              <td>{totalCosts}</td>
              <td></td>
              <td></td>
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