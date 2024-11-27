import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Tooltip from './Tooltip';

const AddItemRow = ({content, onClick}) => {
  return (
    <div className='add-item-row'>
        <Tooltip content={content} width='30px' left='30px' top='-5px'>
            <AddCircleOutlineOutlinedIcon className="add-icon" onClick={onClick}/>
        </Tooltip>
    </div>
  )
}

export default AddItemRow