import Milestones from "../../components/Wall/Milestones"
import { Data } from "../../state/Data";
import { useContext } from "react";

const Wall = () => {
  const data = useContext(Data)

  return (
    <div className='page-container'>
        <div className='page-top-container'>
          <h1>Mijlpalen</h1>
        </div>
      <div className='banner-container'>
        {data[0] && data[0].map(item => (
          <Milestones key={item.ID} item={item}/>
        ))}
      </div>
    </div>
  )
}

export default Wall