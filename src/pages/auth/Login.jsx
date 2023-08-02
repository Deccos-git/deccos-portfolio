import { signInWithEmailAndPassword } from "firebase/auth";
import ButtonClicked from "../../components/common/ButtonClicked";
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { Auth } from '../../state/Auth';
import { auth } from '../../firebase/config';
import Location from "../../helpers/Location";
import Hostname from "../../helpers/Hostname";
import Modal from 'react-modal';
import { sendPasswordResetEmail } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [user] = useContext(Auth)
  const [logo, setLogo] = useState()
  const [modalOpen, setModalOpen] = useState(false)
  const [emailReset, setEmailReset] = useState('')
  const [errorReset, setErrorReset] = useState('')
  const [succesReset, setSuccesReset] = useState('')

  const navigate = useNavigate()
  const client = Location()[2]
  const host = Hostname()
  Modal.setAppElement('#root');

  const modalStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-10%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: 'auto'
      },
    };

  useEffect(() => {
    setLogo(host.logo)
  },[host])

  const navigateToHQ = () => {

    if(client){
      navigate(`/dashboard/home/${client}`)
    } else{
      navigate(`/dashboard/home/${user.portfolio[0]}`)
    }
  }

  const login = (e) => {

    ButtonClicked(e, 'Inloggen')

    signInWithEmailAndPassword(auth, email, password)
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

  const resetPasswordModal = () => {

    setModalOpen(true)

  }

  const closeModal = () => {
      setModalOpen(false);
  }

  const emailResetHandler = (e) => {
      const email = e.target.value 

      setEmailReset(email)
  }

  const resetPassword = (e) => {

    ButtonClicked(e, 'Verzonden')

    sendPasswordResetEmail(auth, emailReset)
    .then(() => {
        setSuccesReset(`Er is een email verstuurd naar ${emailReset} waarmee je je wachtwoord kunt resetten.`)
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if(errorCode === 'auth/user-not-found'){
            setErrorReset('Dit emailaders is niet bekend. Probeer een ander emailadres of stuur een mailtje naar info@deccos.nl')
            resetResetButton(e)
        } else if (errorCode === ''){

        }
    });
}

const resetResetButton = (e) => {
  setTimeout(() => {
      e.target.innerText = 'Verzenden' 
      e.target.style.borderColor = 'green'
      e.target.style.color = 'green'
  }, 3000)
}

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
          <p id='password-reset-button-modal' onClick={resetPasswordModal}>Wachtwoord vergeten? Klik hier.</p>
          <div className='button-container'>
              <button onClick={login}>Login</button>
          </div>
      </div>
      <Modal
          isOpen={modalOpen}
          onRequestClose={closeModal}
          style={modalStyles}
          contentLabel="Upload file"
      >
          <h2>Reset wachtwoord</h2>
          <p>Jouw emailadres</p>
          <input type="text" placeholder='Schrijf hier je emailadres' onChange={emailResetHandler}/>
          <p id='error-message-reset-password'>{errorReset}</p>
          <p id='succes-message-password-reset'>{succesReset}</p>
          <button id='button-reset-password' onClick={resetPassword}>Versturen</button>
      </Modal>
    </div>
  )
}

export default Login