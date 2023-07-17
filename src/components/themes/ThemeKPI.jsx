import { useFirestoreGeneral } from "../../firebase/useFirestore"
import KpiMetaTheme from "./KpiMetaTheme"

const ThemeKPI = ({item}) => {

    const themes = useFirestoreGeneral('themes', 'id', item.themeId)

  return (
    <>
        {themes && themes.map(item => (
            <>
            {item.kpis && item.kpis.map(item => (
              <KpiMetaTheme item={item} />
            ))}
            </>
        ))}
    </>
  )
}

export default ThemeKPI