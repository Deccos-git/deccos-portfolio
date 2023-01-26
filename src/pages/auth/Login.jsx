import { signInWithEmailAndPassword } from "firebase/auth";
import ButtonClicked from "../../components/common/ButtonClicked";
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { Auth } from '../../state/Auth';
import { authDeccos } from '../../firebase/configDeccos';
import Logo from '../../assets/deccos-finpact-logo.png'
import Location from "../../helpers/Location";
import Hostname from "../../helpers/Hostname";

const Login = () => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [user] = useContext(Auth)
  const [logo, setLogo] = useState()

  const navigate = useNavigate()
  const client = Location()[2]
  const host = Hostname()

  useEffect(() => {
    setLogo(host.logo)
  },[host])

  const navigateToHQ = () => {

    if(client){
      navigate(`/dashboard/wall/${client}`)
    } else{
      navigate(`/dashboard/wall/${user.Finpact[0]}`)
    }
  }

  const login = (e) => {

    ButtonClicked(e, 'Inloggen')

    signInWithEmailAndPassword(authDeccos, email, password)
      .then((userCredential) => {
        const auth = userCredential.user;

        if(user){
          navigateToHQ()
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
      navigateToHQ()
    }
  }

  isAuth()

  return (
    <div className="layout-container">
      <div id='topbar-landing-container'>
        <img id='topbar-logo' src={logo} alt="Logo" onClick={() => navigate(`/`)} />
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