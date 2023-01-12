import { client } from "../../helpers/Client"
import Milestones from "../../components/Wall/Milestones"
import { Orgs } from "../../state/Organisations";
import { useContext } from "react";

const Wall = () => {
  const organisations = useContext(Orgs)

  const id = client

  return (
    <div className='page-container'>
        <div className='page-top-container'>
          <h1>Mijlpalen</h1>
        </div>
      <div className='banner-container'>
        {organisations && organisations[0].map(item => (
          <Milestones item={item}/>
        ))}
      </div>
    </div>
  )
}

export default Wall