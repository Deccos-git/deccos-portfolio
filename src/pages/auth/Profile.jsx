import Location from "../../helpers/Location";
import { useFirestoreGeneral } from '../../firebase/useFirestore'
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import ButtonClicked from "../../components/common/ButtonClicked"

const Profile = () => {

  const user = Location()[4]
  const navigate = useNavigate()

  const users = useFirestoreGeneral('users', 'id', user)

  const logoutHandler = async (e) => {

    ButtonClicked(e, 'Uitgelogd')

    await signOut(auth)

    navigate(`/`)

  }

  return (
    <div className='page-container'>
        <div className='page-top-container'>
          {users && users.map(item => (
            <h1 key={item.id}>{item.userName}</h1>
          ))}
        </div>
        <div className='banner-container'>
          {users && users.map(item => (
            <div key={item.id} className='profile-container'>
              <img className='profile-avatar' src={item.photo} alt="" />
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