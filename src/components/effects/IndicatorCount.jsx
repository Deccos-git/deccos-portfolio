import { useFirestoreGeneral } from '../../firebase/useFirestore'

const IndicatorCount = ({id}) => {

    // Firestore
    const indicators  = useFirestoreGeneral('indicators', 'effectId', id)

  return (
    <p id='effects-table-indicator-counter'>{indicators.length}</p>
  )
}

export default IndicatorCount