import React from 'react'
import { Data } from "../../state/Data";
import { useContext, useState, useEffect } from "react";
import Location from '../../helpers/Location';
import { useFirestoreGeneral } from '../../firebase/useFirestore'
import { useFirestoreGeneral as useFirestoreGeneralDeccos } from '../../firebase/useFirestoreDeccos'
import OutputRoundedIcon from '@mui/icons-material/OutputRounded';
import LandscapeOutlinedIcon from '@mui/icons-material/LandscapeOutlined';
import DashboardPairedKpis from '../../components/dashboard/DashboardPairedKpis'
import { Settings } from '../../state/Settings';
import PhotoAlbumOutlinedIcon from '@mui/icons-material/PhotoAlbumOutlined';

const Dashboard = () => {
  const data = useContext(Data)
  const [settings] = useContext(Settings)

  const [period, setPeriod] = useState('all')
  const [outputId, setOutputId] = useState('')
  const [activityId, setActivityId] = useState('')
  const [effectId, setEffectId] = useState('')

  const client = Location()[3]
  const options = {year: 'numeric'};
  const compagnies = data[0]

  const effects  = useFirestoreGeneral('effects', 'compagny', client)
  const outputs = useFirestoreGeneral('outputs', 'compagny', client)
  const activities = useFirestoreGeneral('activities', 'compagny', client)
  const themes = useFirestoreGeneral('themes', 'compagny', client)
  // const pairedKpis = useFirestoreGeneralDeccos('PairedKPIs', 'ThemeKpiId', kpiId)
  const pairedOutputs = useFirestoreGeneralDeccos('PairedOutputs', 'ThemeOutputId', outputId)


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

  // Set the first effect as default
  useEffect(() => {
    effects.length > 0 ? setEffectId(effects[0].id) : setEffectId(null)
  },[effects]) 

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
                <p>{effects.length === 1 ? `Effect` : `Effecten`}</p>
                {/* <p className='dashboard-growth-indicator'>+ {selectedPeriod(period, 1)}</p> */}
              </div>
          </div>
          <div className='key-metrics-container'>
            <h1>{activities.length}</h1>
            <div className='key-matrics-growth-container'>
                <p>{activities.length === 1 ? `Activiteit` : `Activiteiten`}</p>
                {/* <p className='dashboard-growth-indicator'>+ {selectedPeriod(period, 2)}</p> */}
              </div>
          </div>
          <div className='key-metrics-container'>
            <h1>{themes.length}</h1>
            <div className='key-matrics-growth-container'>
                <p>{themes.length === 1 ? `Thema` : `Thema's`}</p>
                {/* <p className='dashboard-growth-indicator'>+ {selectedPeriod(period, 3)}</p> */}
              </div>
          </div>
        </section>

        <section id='dashboard-outputs-container'>
          <div className='dashboard-section-title-container'>
            <PhotoAlbumOutlinedIcon/>
            <h2>Activiteiten</h2>
          </div>
          <div className='select-activity-container'>
              <div className="select-activity-inner-container">
                {activities && activities.map(item => (
                    <div 
                    className="select-activity-item-container" 
                    key={item.ID} 
                    style={{backgroundColor: activityId === item.id ? '#f4f4f4' : 'white'}}
                    data-id={item.id} onClick={() => setActivityId(item.id)}
                    >
                      <p data-id={item.id} onClick={() => setActivityId(item.id)}>{item.title}</p>
                    </div>
                ))}
              </div>
          </div>
          <div>
            {pairedOutputs && pairedOutputs.map(item => (
              <div key={item.ID}>
                <p>Test</p>
              </div>
            ))}
          </div>
        </section>

        <section id='dashboard-outputs-container'>
          <div className='dashboard-section-title-container'>
            <LandscapeOutlinedIcon />
            <h2>Effecten</h2>
          </div>
          <div className='select-activity-container'>
              <div className="select-activity-inner-container">
                {effects && effects.map(item => (
                    <div 
                    className="select-activity-item-container" 
                    key={item.ID} 
                    style={{backgroundColor: effectId === item.id ? '#f4f4f4' : 'white'}}
                    data-id={item.id} onClick={() => setEffectId(item.id)}
                    >
                    <p data-id={item.id} onClick={() => setEffectId(item.id)}>{item.title}</p>
                    </div>
                ))}
              </div>
          </div>
          <div>
            {/* <DashboardPairedKpis kpiId={kpiId} /> */}
          </div>
        </section>

    </div>
  )
}

export default Dashboard