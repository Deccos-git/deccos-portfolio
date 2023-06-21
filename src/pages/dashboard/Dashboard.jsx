import React from 'react'
import { Data } from "../../state/Data";
import { useContext, useState, useEffect } from "react";
import Location from '../../helpers/Location';
import { useFirestoreGeneral } from '../../firebase/useFirestore'
import OutputRoundedIcon from '@mui/icons-material/OutputRounded';
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';
import KpiMetaDashboard from '../../components/dashboard/KpiMetaDashboard'
import DashboardPairedKpis from '../../components/dashboard/DashboardPairedKpis'
import { Settings } from '../../state/Settings';

const Dashboard = () => {
  const data = useContext(Data)
  const [settings] = useContext(Settings)

  const [period, setPeriod] = useState('all')
  const [activityId, setActivityId] = useState('')
  const [kpiId, setKpiId] = useState('')

  const client = Location()[3]
  const options = {year: 'numeric'};
  const compagnies = data[0]

  const effects  = useFirestoreGeneral('effects', 'compagny', client)
  const outputs = useFirestoreGeneral('outputs', 'compagny', client)
  const activities = useFirestoreGeneral('activities', 'compagny', client)
  const kpis = useFirestoreGeneral('kpis', 'compagny', client)
  const targetgroups = useFirestoreGeneral('targetgroups', 'compagny', client)

  const compagnyProject = () => {
    if(settings[0]?.compagnyProject === 'project'){
      return 'Projecten'
    } else {
      return 'Organisaties'
    }
  }

   // Set the first activity as default
   useEffect(() => {
      activities.length > 0 ? setActivityId(activities[0].id) : setActivityId(null)
  },[activities])

  // Set the first kpi as default
  useEffect(() => {
    kpis.length > 0 ? setKpiId(kpis[0].id) : setKpiId(null)
  },[kpis]) 

  const selectActivity = (e) => {
    setActivityId(e.target.dataset.id)
  }

  const selectKpi = (e) => {
    setKpiId(e.target.dataset.id)
  }

  const selectedPeriod = (period, datatype) => {

    const array = []

    data[datatype ].forEach(item => {
      const date = item.Timestamp && item.Timestamp.toDate().toLocaleDateString("nl-NL", options)

      if (date === period) {
        array.push(item)
      } else if(period === 'all'){
        array.push(item)
      }

    })

    console.log(array)
    return array.length
  }


  const periodHandler = (e) => {
      const value = e.target.options[e.target.selectedIndex].value

      setPeriod(value)
  }

  return (
    <div className='page-container'>
        {/* <div className='dashboard-period-selector-container'>
          <div className='dashboard-period-selector'>
            <p>Periode</p>
            <select name="period" id="period" onChange={periodHandler}>
              <option value="all">Alles</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>
        </div> */}

        <section className='dashboard-topbar-container'>
          <div className='key-metrics-container'>
              <h1>{compagnies.length}</h1>
              <div className='key-matrics-growth-container'>
                <p>{compagnyProject()}</p>
                {/* <p className='dashboard-growth-indicator'>+ {selectedPeriod(period, 0)}</p> */}
              </div>
          </div>
          <div className='key-metrics-container'>
            <h1>{effects.length}</h1>
            <div className='key-matrics-growth-container'>
                <p>Effecten</p>
                {/* <p className='dashboard-growth-indicator'>+ {selectedPeriod(period, 1)}</p> */}
              </div>
          </div>
          <div className='key-metrics-container'>
            <h1>{outputs.length}</h1>
            <div className='key-matrics-growth-container'>
                <p>Outputs</p>
                {/* <p className='dashboard-growth-indicator'>+ {selectedPeriod(period, 2)}</p> */}
              </div>
          </div>
          <div className='key-metrics-container'>
            <h1>{targetgroups.length}</h1>
            <div className='key-matrics-growth-container'>
                <p>Doelgroepen</p>
                {/* <p className='dashboard-growth-indicator'>+ {selectedPeriod(period, 3)}</p> */}
              </div>
          </div>
        </section>

        <section id='dashboard-outputs-container'>
          <div className='dashboard-section-title-container'>
            <OutputRoundedIcon />
            <h2>Outputs</h2>
          </div>
          <div className='select-activity-container'>
              <div className="select-activity-inner-container">
                {activities && activities.map(item => (
                    <div 
                    className="select-activity-item-container" 
                    key={item.ID} 
                    style={{backgroundColor: activityId === item.id ? '#f4f4f4' : 'white'}}
                    data-id={item.id} onClick={selectActivity}
                    >
                      <p data-id={item.id} onClick={selectActivity}>{item.title}</p>
                    </div>
                ))}
              </div>
          </div>
        </section>

        <section id='dashboard-outputs-container'>
          <div className='dashboard-section-title-container'>
            <LandscapeOutlinedIcon />
            <h2>KPIs</h2>
          </div>
          <div className='select-activity-container'>
              <div className="select-activity-inner-container">
                {kpis && kpis.map(item => (
                    <div 
                    className="select-activity-item-container" 
                    key={item.ID} 
                    style={{backgroundColor: kpiId === item.id ? '#f4f4f4' : 'white'}}
                    data-id={item.id} onClick={selectKpi}
                    >
                    <KpiMetaDashboard kpi={item} setKpiId={setKpiId}/>  
                    </div>
                ))}
              </div>
          </div>
          <div>
            <DashboardPairedKpis kpiId={kpiId} />
          </div>
        </section>

    </div>
  )
}

export default Dashboard