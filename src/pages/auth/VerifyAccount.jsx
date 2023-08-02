import { dbDeccos as db } from "../../firebase/configDeccos";
import { useNavigate } from "react-router-dom"
import Location from "../../helpers/Location";
import { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore"; 
import Hostname from "../../helpers/Hostname";
import { useFirestoreGeneral } from "../../firebase/useFirestoreDeccos";

const VerifyAccount = () => {
  const [name, setName] = useState('')
  const [docid, setDocid] = useState('')
  const [logo, setLogo] = useState('')

  const client = Location()[2]
  const user = Location()[3]
  const host = Hostname()
  const navigate = useNavigate()

  const users = useFirestoreGeneral('Users', 'ID', user)

  useEffect(() => {
    users && users.forEach(item => {
      setName(item.UserName)
      setDocid(item.docid)
    })
  },[users])

  useEffect(() => {
    setLogo(host.logo)
  },[host])

  const verifyAccount = async () => {

    await updateDoc(doc(db, "Users", docid), {
      Approved: true
    })

    navigate(`/dashboard/wall/${client}`)
  }

  return (
    <div className="layout-container">
      <div id='topbar-landing-container'>
        <img id='topbar-logo' src={logo} alt="Logo" onClick={() => navigate(`/`)} />
      </div>
      <div className='login-register-container'>
        <h1>Verifier je account</h1>
        <p>Welkom {name}</p>
        <p>Verifiëer je account door op de knop hieronder te klikken.</p>
        <div className='button-container'>
          <button onClick={verifyAccount}>Verifiëer account</button>
        </div>
    </div>
  </div>
  )
}

export default VerifyAccount