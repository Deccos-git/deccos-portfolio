import { useFirestoreGeneral } from "../../firebase/useFirestoreDeccos"
import Location from "../../helpers/Location";

const Organisation = () => {

    const compagnyId = Location()[4]

    const compagnies = useFirestoreGeneral('CompagnyMeta', 'CompagnyID', compagnyId ? compagnyId : '')


  return (
    <div className='page-container'>
        <div className='page-top-container'>
        {compagnies && compagnies.map(item => (
          <div key={item.CompagnyID}>
            <h1>{item.CommunityName}</h1>
          </div>
        ))}
        </div>
        <div className="report-container">
            <div>
                {compagnies && compagnies.map(item => (
                    <div>
                        <img className="report-banner" src={item.ImpactBanner} alt="" />
                        <img className="report-logo" src={item.Logo} alt="" />
                        <h1 className="report-title">{item.CommunityName}</h1>
                    </div>
                    
                ))}
            </div>
            {/* <div className="report-inner-container">
                <div className="report-section">
                    <div className="report-section-title-container">
                        <img src={problemIcon} alt="" />
                        <h2>Het probleem waar wij ons voor inzetten</h2>
                    </div>
                    {centralProblem && centralProblem.map(item => (
                        <p>{item.CentralProblem}</p>
                    ))}
                    <div className="report-section-title-container">
                        <img src={milestoneIcon} alt="" />
                        <h2>Ons doel</h2>
                    </div>
                    {goal && goal.map(item => (
                        <p>{item.Title}</p>
                    ))}
                </div>
                <div className="report-section-container-contrast">
                    <div className="report-section-title-container">
                        <img src={personIcon} alt="" />
                        <h2>Voor wie we het doen</h2>
                    </div>
                    <div className="report-targetgroup-container">
                        {targetgroups && targetgroups.map(item => (
                            <div className="report-targetgroup-item-container">
                                <p>{item.Organisation}</p>
                            </div>
                        ))}
                    </div>
              
                </div>
                <div className="report-section">
                    <div className="report-section-title-container">
                        <img src={activityIcon} alt="" />
                        <h2>Wat we doen</h2>
                    </div>
                    <div className="report-activities-container">
                        {activities && activities.map(item => (
                            <div className="report-activity-item-container">
                                <h3>{item.Activity}</h3>
                                <ActivityOutput activity={item.ID}/>
                            </div>
                        ))}
                    </div>
                    
                </div>
                <div className="report-section-container-contrast">
                    <div className="report-section-title-container">
                        <img src={trajectIcon} alt="" />
                        <h2>Wat we willen bereiken</h2>
                    </div>
                    {kpis && kpis.map(item => (
                        <div className="report-effect-data-item-container">
                            <h3>{item.Effect}</h3>
                            <EffectData effect={item}/>
                        </div>
                    ))}
                </div>
            </div> */}
        </div>
    </div>
  )
}

export default Organisation