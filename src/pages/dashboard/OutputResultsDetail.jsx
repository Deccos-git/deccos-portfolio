import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import OutputMeta from '../../components/outputs/OutputMeta'
import Location from '../../helpers/Location'
import { useFirestoreGeneralThree } from "../../firebase/useFirestore";
import OutputsGraph from '../../components/outputs/OutputsGraph'
import { useState } from 'react'

const OutputResultsDetail = () => {
    const [data, setDate ] = useState([])

    // Hooks
    const portfolioId = Location()[3]
    const outputId = Location()[4]

    // Firestore
    const syncs = useFirestoreGeneralThree('synchronisations', 'portfolioId', portfolioId ? portfolioId : 'none', 'syncItem', outputId ? outputId : 'none', 'status', 'accepted')

  return (
    <div className='page-container'>
        <div className='page-top-container'>
        <div className='page-header-title-container'>
            <SearchOutlinedIcon/>
            <h1>Outputresultaten</h1>
            <p><OutputMeta /></p>
        </div>
        </div>
        <div className='table-container'>
            {data.map(item => (
                <OutputsGraph data={item}/>
            ))}
        </div>
    </div>
  )
}

export default OutputResultsDetail