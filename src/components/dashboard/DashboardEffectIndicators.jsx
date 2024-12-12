import { useFirestoreGeneral } from '../../firebase/useFirestore'
import IndicatorData from '../indicators/IndicatorData'

const DashboardEffectIndicators = ({effectId}) => {

    const indicators = useFirestoreGeneral('indicators', 'effectId', effectId)

    console.log(indicators)
  return (
    <div>
        {indicators && indicators.map(indicator => (
            <div key={indicator.id}>
              <h2>{indicator.question}</h2>
              <IndicatorData indicator={indicator} effectId={effectId} />
            </div>
        ))}
    </div>
  )
}

export default DashboardEffectIndicators