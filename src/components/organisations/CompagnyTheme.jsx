import { useFirestoreGeneral } from "../../firebase/useFirestore"
import ThemeMeta from "../themes/ThemeMeta";

const CompagnyTheme = ({item}) => {

    const themeCompagnyPairs = useFirestoreGeneral('themeCompagnyPairs', 'compagnyId', item.ID ? item.ID : '' )

  return (
    <>
        {themeCompagnyPairs && themeCompagnyPairs.map(item => (
            <ThemeMeta item={item} />
        ))}
    </>
  )
}

export default CompagnyTheme