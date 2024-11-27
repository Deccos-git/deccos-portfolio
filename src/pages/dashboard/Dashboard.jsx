import React from 'react'
import { Data } from "../../state/Data";
import { useContext, useState, useEffect } from "react";
import Location from '../../helpers/Location';
import { useFirestoreGeneral } from '../../firebase/useFirestore'
import { Settings } from '../../state/Settings';
import DashboardOutputResults from '../../components/dashboard/DashboardOutputResults';
import DashboardOutputResultsDetail from '../../components/dashboard/DashboardOutputResultsDetail';
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import ZoomOutOutlinedIcon from '@mui/icons-material/ZoomOutOutlined';
import Tooltip from "../../components/common/Tooltip";

const Dashboard = () => {
  // Context
  const data = useContext(Data)
  const [settings] = useContext(Settings)

  // State
  const [period, setPeriod] = useState('all')
  const [outputId, setOutputId] = useState('')
  const [outputDetails, setOutputDetails] = useState(false)
  const [effectId, setEffectId] = useState('')

  // Hooks
  const client = Location()[3]
  const options = {year: 'numeric'};
  const compagnies = data[0]

  // Firestore
  const effects  = useFirestoreGeneral('effects', 'company', client ? client : '')
  const outputs = useFirestoreGeneral('outputs', 'company', client ? client : '')

  // Set outputId as default
  useEffect(() => {
    if(outputs.length > 0){
      setOutputId(outputs[0].id)
    }
  }, [outputs])

  // Change compagny/project based on settings
  const compagnyProject = () => {
    if(settings[0]?.compagnyProject === 'project'){
      return 'Projecten'
    } else {
      return 'Organisaties'
    }
  }

  // Select period function
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

    return array.length
  }

  // Period handler
  const periodHandler = (e) => {
      const value = e.target.options[e.target.selectedIndex].value

      setPeriod(value)
  }

  const detailContainerStyle = {
    maxHeight: outputDetails ? '500px' : '0px',
    overflow: 'hidden',
    transition: 'max-height 2s ease-in-out',
  };


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
              <h1>{outputs.length}</h1>
              <div className='key-matrics-growth-container'>
              <p>{outputs.length === 1 ? `Output` : `Outputs`}</p>
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
        </section>

        <section className='section-container' id='dashboard-outputs-container'>
          <div className='dashboard-section-title-container'>
            <h2>Outputs</h2>
          </div>
          <div className='select-activity-container'>
              <div className="select-activity-inner-container">
                {outputs && outputs.map(item => (
                    <div 
                    className="select-activity-item-container" 
                    key={item.id} 
                    style={{backgroundColor: outputId === item.id ? '#f4f4f4' : 'white'}}
                    data-id={item.id} onClick={() => setOutputId(item.id)}
                    >
                      <p data-id={item.id} onClick={() => setOutputId(item.id)}>{item.title}</p>
                    </div>
                ))}
              </div>
          </div>
          <div>
            {!outputDetails &&
              <div onClick={() => setOutputDetails(true)}>
                <Tooltip content='Bekijk details' top='40px'>
                  <ZoomInOutlinedIcon />
                </Tooltip>
              </div>
            }
            {outputDetails &&
              <div onClick={() => setOutputDetails(false)}>
                <Tooltip content='Verberd details' top='40px'>
                  <ZoomOutOutlinedIcon />
                </Tooltip>
              </div>
            }
            <DashboardOutputResults outputId={outputId} />
            <div style={detailContainerStyle} id='dashboard-outputs-detail-container'>
              <DashboardOutputResultsDetail outputId={outputId} />
            </div>
          </div>
        </section>

        <section className='section-container' id='dashboard-outputs-container'>
          <div className='dashboard-section-title-container'>
            <h2>Effecten</h2>
          </div>
          {/* <ConstructionOutlinedIcon /> */}
          {/* <p><b>Under construction</b></p> */}
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