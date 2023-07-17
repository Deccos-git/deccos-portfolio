import { useFirestoreGeneral } from "../../firebase/useFirestore"

const ThemeMeta = ({item}) => {

    const themes = useFirestoreGeneral('themes', 'id', item.themeId ? item.themeId : '' )

  return (
    <>
        {themes && themes.map(item => (
            <p key={item.id}>{item.title}</p>
        ))}
    </>
  )
}

export default ThemeMeta