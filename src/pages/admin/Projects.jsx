import Location from "../../helpers/Location";
import { useFirestoreGeneral, useFirestoreArrayContains } from "../../firebase/useFirestore";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useEffect, useState } from "react";
import ButtonClicked from '../../components/common/ButtonClicked';
import { doc, setDoc, updateDoc, serverTimestamp, arrayUnion, arrayRemove } from "firebase/firestore"; 
import { db } from "../../firebase/config";
import { dbDeccos } from "../../firebase/configDeccos";
import uuid from "react-uuid";
import Hostname from "../../helpers/Hostname";
import { Data } from "../../state/Data";
import { useContext } from "react";

const Projects = () => {
    const data = useContext(Data)
  
//   const members = useFirestoreArrayContains('users', 'portfolio', client)
//   const users = useFirestoreGeneral('users', 'email', email)
//   const organisatons = useFirestoreGeneral('compagnies', 'id', client)

console.log(data[0])


  return (
    <div className='page-container'>
        <div className='page-top-container'>
            <h1>Projecten</h1>
        </div>
        <div className='table-container'>
          <table>
            <tr>
                <th>PROJECT</th>
                <th>PROJECTOMGEVING</th>
            </tr>
            {data[0] && data[0].map(item => (
                <tr key={item.ID} >
                  <td>
                      <p>{item.CommunityName}</p>  
                  </td>
                  <td>
                    <a href={`https://impactdashboard.deccos.nl/${item.CompagnyID}/documentation`} target="_blank">Bekijk</a>
                  </td>
              </tr>
            ))} 
          </table>
        </div>
    </div>
  )
}

export default Projects