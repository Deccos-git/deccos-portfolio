import React from 'react'
import { Data } from "../../state/Data";
import { useContext } from "react";
import { useFirestoreGeneral } from '../../firebase/useFirestore'
import Location from '../../helpers/Location';
import { Auth } from '../../state/Auth';

const Dashboard = () => {
  const data = useContext(Data)
  const [auth] = useContext(Auth)

  console.log(auth)

  const client = Location()[3]

  const effects = useFirestoreGeneral('effects', 'compagny', client)

  return (
    <div className='page-container'>
        <div>
            <h1><span>👋 </span> Welkom, {auth.ForName}</h1>
        </div>
        <div className='banner-container'>
          <div>
            <p>Organisaties</p>
            <p>{data[0].length}</p>
          </div>
          <div>
            <p>Effecten</p>
            <p>{effects.length}</p>
          </div>
        </div>
    </div>
  )
}

export default Dashboard