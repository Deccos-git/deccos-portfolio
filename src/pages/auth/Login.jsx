import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import ButtonClicked from "../../components/common/ButtonClicked";
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { Auth } from '../../state/Auth';
import { auth } from '../../firebase/configDeccos';
import Logo from '../../assets/deccos-finpact-logo.png'

const Login = () => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [user] = useContext(Auth)

  const navigate = useNavigate()

  const login = (e) => {

    ButtonClicked(e, 'Inloggen')

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const auth = userCredential.user;

        if(user){
          navigate(`/dashboard/wall/${user.Finpact[0]}`)
        }

        
      })
      .then((user) =>{
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      });
  }

  const emailHandler = (e) => {
    const value = e.target.value 

    setEmail(value)
  }

  const passwordHandler = (e) => {
      const value = e.target.value 

      setPassword(value)
  }

  const isAuth = () => {
    if(user){
      navigate(`/dashboard/wall/${user.Finpact[0]}`)
    }
  }

  isAuth()

  return (
    <div className="layout-container">
      <div id='topbar-landing-container'>
        <img id='topbar-logo' src={Logo} alt="Logo" onClick={() => navigate(`/`)} />
      </div>
      <div className='login-register-container'>
          <h1>Login</h1>
          <p>Email</p>
          <input type="email" placeholder='Schrijf hier je email' onChange={emailHandler} />
          <p>Paswoord</p>
          <input type="password" placeholder='Schrijf hier je paswoord' onChange={passwordHandler} />
          <div className='button-container'>
              <button onClick={login}>Login</button>
          </div>
      </div>
    </div>
  )
}

export default Login