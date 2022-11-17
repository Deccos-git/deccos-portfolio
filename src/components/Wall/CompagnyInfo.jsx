import { useFirestoreCompagny} from "../../firebase/useFirestoreDeccos"

const CompagnyInfo = ({milestone}) => {

    const compagny = useFirestoreCompagny(milestone.CompagnyID)

    return(
        <>
            {compagny && compagny.map(comp => (
                <div key={comp.CompagnyID} className='compagny-meta-inner-container'>
                    <img className='organisations-logo' src={comp.Logo} alt="logo" data-id={comp.CompagnyID} onClick={() => ''} />
                    <div className='milestone-flex-container'>
                        <h2 data-id={comp.CompagnyID} onClick={() => ''}>{comp.CommunityName}</h2>
                        <p>heeft mijlpaal</p>
                    </div>
                </div>
            ))}
        </>
    )
}

export default CompagnyInfo