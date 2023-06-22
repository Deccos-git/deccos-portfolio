import Location from "../../helpers/Location";
import { useFirestoreGeneral } from '../../firebase/useFirestoreDeccos'
import { signOut } from "firebase/auth";
import { authDeccos } from "../../firebase/configDeccos";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const user = Location()[4]
  const navigate = useNavigate()

  const users = useFirestoreGeneral('Users', 'ID', user)

  const logoutHandler = () => {

    signOut(authDeccos).then(() => {
      navigate(`/`) 
    }).catch((error) => {
      alert(error)
    });

  }

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
              <div id='logout-button-container'>
                <button onClick={logoutHandler}>Uitloggen</button>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Profile