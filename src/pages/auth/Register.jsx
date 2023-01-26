import Location from "../../helpers/Location";
import { useState, useEffect } from "react";
import { doc, setDoc, updateDoc, serverTimestamp, arrayUnion } from "firebase/firestore"; 
import saveFile from "../../components/core/savefile";
import Modal from 'react-modal';
import Hostname from "../../helpers/Hostname";
import uuid from "react-uuid";
import { useFirestoreGeneral } from "../../firebase/useFirestore";
import dummyPhoto from '../../assets/dummy-photo.jpeg'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../firebase/configDeccos";
import LogoDeccos from '../../assets/deccos-finpact-logo.png'
import LogoAI from '../../assets/alexander-impact.svg'
import { useNavigate } from "react-router-dom"

const Register = () => {
  const host = Hostname()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordRepeat, setPasswordRepeat] = useState("")
  const [forname, setForname] = useState("")
  const [surname, setSurname] = useState("")
  const [photo, setPhoto] = useState(dummyPhoto)
  const [loader, setLoader] = useState("")
  const [communityNameDB, setCommunityNameDB] = useState("")
  const [modalOpen, setModalOpen] = useState(false);
  const [logo, setLogo] = useState(host.logo)

  const client = Location()[2]
  const navigate = useNavigate()
  const id = uuid()

    Modal.setAppElement('#root'); 

    const modalStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };

    const organisatons = useFirestoreGeneral('compagnies', 'id', client)

    useEffect(() => {
      organisatons && organisatons.forEach(item => {
            setCommunityNameDB(item.compagny)
        })
    }, [organisatons])


    const closeModal = () => {
        setModalOpen(false);
      }
    

    const fornameHandler = (e) => {
        const forname = e.target.value

        setForname(forname)
    }

    const surnameHandler = (e) => {
        const surname = e.target.value

        setSurname(surname)
    }

    const emailHandler = (e) => {
        const email = e.target.value

        setEmail(email)
    }

    const passwordHandler = (e) => {
        const password = e.target.value

        setPassword(password)
    }

    const passwordRepeatHandler = (e) => {
        const passwordRepeat = e.target.value

        setPasswordRepeat(passwordRepeat)
    }

    const photoHandler = (e) => {
      saveFile(e.target.file, setPhoto)
    }

    const checkHandler = (e) => {
        e.preventDefault()
        e.target.innerText = "Aangemeld"

        if(password === passwordRepeat){
            registerHandler()
        } else {
            alert('De paswoorden zijn niet gelijk')
        }
    }

    const registerHandler = () => {

      const auth = getAuth();
    
        auth
        .createUserWithEmailAndPassword(email, password)
        .then( async (cred) => {
          await setDoc(doc(db, "Users", cred.user.uid), {
                UserName: `${forname} ${surname}`,
                ForName: forname,
                SurName: surname,
                Timestamp: serverTimestamp(),
                Email: email.toLocaleLowerCase(),
                Photo: photo,
                ID: id,
                Approved: false,
                Deleted: false,
                Docid: cred.user.uid,
                Finpact: arrayUnion(client)
            })
            .then(() => {
                verificationEmailEmail(email, forname, surname, communityNameDB)
            })
            .then(() => {
                setModalOpen(true)
            })
            .catch(err => { 
                alert(err)
            })
        })
    }


    const verificationEmailEmail = async (email, forname, surname, communityName ) => {
      await setDoc(doc(db, "Email", uuid()), {
            to: email,
            from: 'info@deccos.nl',
            replyTo: `${host.Name}`,
            cc: "info@Deccos.nl",
            message: {
            subject: `Verificeer je account `,
            html: `Hallo ${forname} ${surname}, </br></br>
                Je hebt je aangemeld voor de ${host.Name} omgeving van ${communityName}. <br><br>

                Klik <a href="https://${host.Hostname}/${client}/NotApproved/${id}">hier</a> om je account te verifiëren.<br><br>
                
                Vriendelijke groet, </br></br>
                Team ${host.Name} </br></br>
                `,
            Gebruikersnaam: `${forname} ${surname}`,
            Emailadres: email,
            Type: "Verification mail"
              }     
          });
    }

  return (
    <div className="layout-container">
      <div id='topbar-landing-container'>
        <img id='topbar-logo' src={logo} alt="Logo" onClick={() => navigate(`/`)} />
      </div>
      <div className='login-register-container'>
        <h1>Account maken</h1>
        <form>
            <p>Voornaam*</p>
            <input onChange={fornameHandler} type="text" placeholder="Schrijf hier je voornaam" />
            <p>Achternaam</p>
            <input onChange={surnameHandler} type="text" placeholder="Schrijf hier je achternaam" />
            <p>E-mailadres*</p>
            <input onChange={emailHandler} type="email" placeholder="Schrijf hier je e-mailadres" />
            <p>Wachtwoord*</p>
            <input onChange={passwordHandler} type="password" placeholder="Schrijf hier je wachtwoord" />
            <p>Herhaal je wachtwoord*</p>
            <input onChange={passwordRepeatHandler} type="password" placeholder="Herhaal hier je wachtwoord" />
            <p>Profielfoto</p>
            <input onChange={photoHandler} type="file" />
            <div className="spinner-container">
                <img src={loader} alt="" />
            </div>
        </form>
        <div className="button-container-register">
            <button onClick={checkHandler}>Aanmelden</button>
        </div>
        <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Verify account"
        >
        <div className='add-image-container'>
            <h1>Welkom {forname} {surname}!</h1>
            <h2>Je account is aangemaakt</h2>
            <p>Je hoeft je account alleen nog te verifiëren. Er is een email gestuurd naar {email} waarmee je je account kunt verifiëren.</p>
            <a href="https://deccos.nl/">Oké</a>
        </div>
        </Modal>
    </div>
  </div>
  )
}

export default Register