import React from 'react'
import { Data } from "../../state/Data";
import { useContext, useState } from "react";
import Location from '../../helpers/Location';

const Dashboard = () => {
  const data = useContext(Data)
  const [period, setPeriod] = useState('all')

  const options = {year: 'numeric'};
  const compagnies = data[0]
  const effects = data[1]
  const outputs = data[2]
  const targetgroups = data[3]

  const selectedPeriod = (period, datatype) => {

    console.log(datatype)
    const array = []

    data[datatype ].forEach(item => {
      const date = item.Timestamp && item.Timestamp.toDate().toLocaleDateString("nl-NL", options)

      if (date === period) {
        array.push(item)
      } else if(period === 'all'){
        array.push(item)
      }

    })
    return array.length
  }


  const periodHandler = (e) => {
      const value = e.target.options[e.target.selectedIndex].value

      setPeriod(value)
  }

  return (
    <div className='page-container'>
        <div className='dashboard-period-selector-container'>
          <div className='dashboard-period-selector'>
            <p>Periode</p>
            <select name="period" id="period" onChange={periodHandler}>
              <option value="all">Alles</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>
        </div>
        <div className='dashboard-topbar-container'>
          <div className='key-metrics-container'>
              <h1>{compagnies.length}</h1>
              <div className='key-matrics-growth-container'>
                <p>Totale organisaties</p>
                <p className='dashboard-growth-indicator'>+ {selectedPeriod(period, 0)}</p>
              </div>
          </div>
          <div className='key-metrics-container'>
            <h1>{effects.length}</h1>
            <div className='key-matrics-growth-container'>
                <p>Totale effecten</p>
                <p className='dashboard-growth-indicator'>+ {selectedPeriod(period, 1)}</p>
              </div>
          </div>
          <div className='key-metrics-container'>
            <h1>{outputs.length}</h1>
            <div className='key-matrics-growth-container'>
                <p>Totale outputs</p>
                <p className='dashboard-growth-indicator'>+ {selectedPeriod(period, 2)}</p>
              </div>
          </div>
          <div className='key-metrics-container'>
            <h1>{targetgroups.length}</h1>
            <div className='key-matrics-growth-container'>
                <p>Totale doelgroepen</p>
                <p className='dashboard-growth-indicator'>+ {selectedPeriod(period, 3)}</p>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Dashboard