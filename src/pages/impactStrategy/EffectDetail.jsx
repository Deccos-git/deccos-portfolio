import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import Location from '../../helpers/Location'
import Tooltip from "../../components/common/Tooltip";
import { useNavigate } from "react-router-dom";
import { useFirestoreId } from '../../firebase/useFirestore'
import PodcastsOutlinedIcon from '@mui/icons-material/PodcastsOutlined';

const EffectDetail = () => {

    const id = Location()[4]
    const client = Location()[3]
    const navigate = useNavigate()

    const effects = useFirestoreId('effects', id)

    console.log(effects)

    const questionType = (type) => {
        if (type === 'open') {
            return 'Open vraag'
        } else if (type === 'multiple-one') {
            return 'Meerkeuze (één antwoord)'
        } else if (type === 'multiple-multiple') {
            return 'Meerkeuze (meerdere antwoorden)'
        } else if (type === 'scale') {
            return 'Schaalvraag'
        }
    }

  return (
    <div className='page-container'>
        <div className='page-top-container'>
            <div className='page-header-title-container'>
                <PodcastsOutlinedIcon className='page-header-icon'/>
                {effects && effects.map(item => (
                <h1>{item.title}</h1>
                ))}
            </div>
        </div>
        <div>
            {effects && effects.map(item => (
                <div key={item.id}>
                    <h3>Vraag</h3>
                    <p>{item.question}</p>
                    <h3>Type</h3>
                    <p>{questionType(item.questionType)}</p>
                    {item.questionType === 'scale' &&
                    <div>
                        <h3>Schaalvraag details</h3>
                        <div>
                            <p>{item.reachStart}</p>
                            <p>{item.reachStartLabel}</p>
                        </div>
                        <div>
                            <p>{item.reachEnd}</p>
                            <p>{item.reachEndLabel}</p>
                        </div>
                    </div>
                    }
                    {(item.questionType === 'multiple-one' || item.questionType === 'multiple-multiple') &&
                    <div>
                        <h3>Opties</h3>
                        <ul>
                            {item.multipleOptions.map(option => (
                                <li>{option}</li>
                            ))}
                        </ul>
                    </div>
                    }
                </div>
            ))}
        </div>
    </div>
  )
}

export default EffectDetail