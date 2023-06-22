import { useFirestoreGeneralTwo } from "../../firebase/useFirestore"
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { doc, deleteDoc } from 'firebase/firestore';
import Tooltip from "../common/Tooltip";
import { db } from "../../firebase/config";

const PackageOutputGoals = ({item, organisation}) => {

    // console.log(organisation)

    const packageOutputGoals = useFirestoreGeneralTwo('packageOutputGoals', 'packageOutputId', item.id,  'organisationId', organisation)

    // console.log(packageOutputGoals)

    const deleteGoal = (e) => {
        const docid = e.target.dataset.docid

        deleteDoc(doc(db, "packageOutputGoals", docid));
    }

  return (
    <>
        {packageOutputGoals && packageOutputGoals.map((item) => (
            <div key={item.id} id='package-output-goal-outer-container'>
                <div id="package-output-goal-container">
                    <p><b>Doel</b> {item.goal}</p>
                    <p><b>Deadline</b> {item.deadline}</p>
                </div>
                <Tooltip content='Verwijder doel' width='5%'>
                    <DeleteOutlineOutlinedIcon className="table-icon" data-docid={item.docid} onClick={deleteGoal} />
                </Tooltip>
            </div>
        ))}
    </>
  )
}

export default PackageOutputGoals