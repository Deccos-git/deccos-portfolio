import { useFirestoreGeneral } from "../../firebase/useFirestore"
import { useContext } from "react";
import { Settings } from '../../state/Settings';

const ThemeCompagnyPairCount = ({id}) => {
  const [settings] = useContext(Settings)

  const compagnyProject = () => {
    if(settings[0]?.compagnyProject === 'project'){
      return 'projecten'
    } else {
      return 'organisaties'
    }
  }

  const packageCompagnyPairs = useFirestoreGeneral('themeCompagnyPairs', 'themeId', id)


  return (
    <p>Aantal {compagnyProject()}: <b>{packageCompagnyPairs.length}</b> </p>
  )
}

export default ThemeCompagnyPairCount