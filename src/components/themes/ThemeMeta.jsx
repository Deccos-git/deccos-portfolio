import { useFirestoreGeneral } from "../../firebase/useFirestore"

const ThemeMeta = ({themeId}) => {

  const themes = useFirestoreGeneral('themes', 'id', themeId ? themeId : '' )

  return (
    <>
        {themes && themes.map(item => (
            <p key={item.id}>{item.title}</p>
        ))}
    </>
  )
}

export default ThemeMeta