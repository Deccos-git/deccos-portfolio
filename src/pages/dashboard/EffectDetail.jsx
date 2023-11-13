import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import Location from '../../helpers/Location'
import Tooltip from "../../components/common/Tooltip";
import { useNavigate } from "react-router-dom";
import { useFirestoreId } from '../../firebase/useFirestore'

const EffectDetail = () => {

    const id = Location()[4]
    const client = Location()[3]
    const navigate = useNavigate()

    const effects = useFirestoreId('effects', id)

    console.log(effects)

  return (
    <div className='page-container'>
    <div className='page-top-container'>
        <div className='page-header-title-container'>
            {effects && effects.map(item => (
               <h1>{item.title}</h1>
            ))}
        </div>
        <Tooltip content={`Effecten aanpassen`} top='-60px'>
            <AutoFixHighOutlinedIcon className='page-edit-icon'  onClick={() => navigate(`/guide/effects/${client}`)}/>
        </Tooltip>
    </div>
     <div className='table-container'>
        <div id='no-proof-container'>
            <p>Nog geen onderbouwing</p>
        </div>
    </div>
</div>
  )
}

export default EffectDetail