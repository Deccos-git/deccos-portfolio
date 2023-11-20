import { useFirestoreGeneralTwo as useFirestoreGeneralTwoDeccos} from "../../firebase/useFirestoreDeccos"
import ThemeMeta from "../themes/ThemeMeta"

const CompagnyTheme = ({companyId, portfolioId}) => {

    const outputs = useFirestoreGeneralTwoDeccos('Outputs', 'CompagnyID', companyId, 'PortfolioId', portfolioId)

    // Filter duplicates
    const uniqueThemes = [...new Set(outputs?.map(item => item.ThemeID))]

  return (
    <>
      {uniqueThemes && uniqueThemes.map((item, index) => (
        <div key={index}>
            <ThemeMeta themeId={item} />
        </div>
      ))}
    </>
  )
}

export default CompagnyTheme