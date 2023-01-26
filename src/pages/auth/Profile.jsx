import Location from "../../helpers/Location";
import { useFirestoreGeneral } from '../../firebase/useFirestoreDeccos'
import UserCompagnies from '../../components/profile/UserCompagnies'

const Profile = () => {

  const user = Location()[4]

  const users = useFirestoreGeneral('Users', 'ID', user)

  console.log(users)

  return (
    <div className='page-container'>
        <div className='page-top-container'>
          {users && users.map(item => (
            <h1 key={item.ID}>{item.UserName}</h1>
          ))}
        </div>
        <div className='banner-container'>
          {users && users.map(item => (
            <div key={item.ID} className='profile-container'>
              <img className='profile-avatar' src={item.Photo} alt="" />
              <div className='profile-container'>
                <h2>Mijn impactHQ's</h2>
                <UserCompagnies user={item}/>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Profile