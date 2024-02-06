import { useFirestoreGeneralTwo } from '../../firebase/useFirestore';
import Location from '../../helpers/Location';

const SynchronisationCount = ({compagnyId}) => {

    // Hooks
    const portfolioId = Location()[3]

    // Firestore
    const synchronisations = useFirestoreGeneralTwo('synchronisations', 'compagnyId', compagnyId, 'portfolioId', portfolioId)

  return (
    <p>{synchronisations.length}</p>
  )
}

export default SynchronisationCount