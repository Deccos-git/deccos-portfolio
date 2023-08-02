import Location from "../../helpers/Location";
import { useFirestoreGeneral, useFirestoreArrayContains } from "../../firebase/useFirestore";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useEffect, useState } from "react";
import ButtonClicked from '../../components/common/ButtonClicked';
import { doc, setDoc, updateDoc, serverTimestamp, arrayUnion, arrayRemove } from "firebase/firestore"; 
import { db } from "../../firebase/config";
import { dbDeccos } from "../../firebase/configDeccos";
import uuid from "react-uuid";
import Hostname from "../../helpers/Hostname";

const Team = () => {
  const [email, setEmail] = useState('')
  const [docid, setDocid] = useState('')
  const [organisationName, setOrganisationName] = useState('')

  const client = Location()[3]
  const host = Hostname()
  
  const members = useFirestoreArrayContains('users', 'portfolio', client)
  const users = useFirestoreGeneral('users', 'email', email)
  const organisatons = useFirestoreGeneral('compagnies', 'id', client)

  useEffect(() => {
    users && users.forEach(item => {
      setDocid(item.docid)
    })
  },[users])

  useEffect(() => {
    organisatons && organisatons.forEach(item => {
      setOrganisationName(item.compagny)
    })

  },[organisatons])

  const emailHandler = (e) => {
    const value = e.target.value 

    setEmail(value)
  }

  const inviteMemberHandler = (e) => {

    if(users.length > 0){
        console.log('Member exists')
        updateExistingMember()
        sendMailToExistingMember()
    } else if(users.length === 0){
      console.log('Member does not exist')
        sendMailToNewMember()
    } 

    ButtonClicked(e, 'Uitnodiging verstuurd')

  }

  const updateExistingMember = async () => {

      await updateDoc(doc(db, "users", docid),{     
        portfolio: arrayUnion(client)
    })

  }

  const sendMailToExistingMember = async () => {

    await setDoc(doc(dbDeccos, "Email", uuid()), {
      to: email,
      cc: "info@deccos.nl",
      from: "info@deccos.nl",
      replyTo: `${host.name}`,
      message: {
      subject: `${organisationName} nodigt je uit om lid te worden van de ${host.name} ${host.text} omgeving`,
      html: `
          ${organisationName} nodigt je uit om lid te worden van de ${host.name} ${host.text} omgeving. <br><br>

          <a href='https://${host.url}/login/${client}'>Klik hier</a> om naar de omgeving van ${organisationName} te gaan.<br><br>

          Met vriendelijke groet, <br><br>

          Team ${host.name} <br><br>
          
          `,
      Gebruikersnaam: `${client}`,
      Emailadres: email,
      Type: "Invite member"
          }     
    })  
  }

  const sendMailToNewMember = async () => {

    await setDoc(doc(dbDeccos, "Email", uuid()), {
          to: email,
          cc: "info@deccos.nl",
          from: "info@deccos.nl",
          replyTo: `${host.name}`,
          message: {
          subject: `${organisationName} nodigt je uit om lid te worden van de ${host.name} ${host.text} omgeving`,
          html: `
              ${organisationName} nodigt je uit om lid te worden van de ${host.name} ${host.text} omgeving. <br><br>

              <a href='https://${host.url}/register/${client}'>Klik hier</a> om een account aan te maken.<br><br>

              Met vriendelijke groet, <br><br>

              Team ${host.name} <br><br>
              
              `,
          Gebruikersnaam: `${client}`,
          Emailadres: email,
          Type: "Invite member"
              }     
      })
  }

  const deleteMember = async (e) => {

    const docid = e.target.dataset.docid 

    await updateDoc(doc(db, "users", docid), {
      Portfolio: arrayRemove(client)
    })
  }

  return (
    <div className='page-container'>
        <div className='page-top-container'>
            <h1>Team</h1>
        </div>
        <div className='settings-container'>
            <h2>Teamlid uitnodigen</h2>
            <input type="text" placeholder='Noteer hier het emailadres' onChange={emailHandler}/>
            <div className='button-container'>
              <button onClick={inviteMemberHandler}>Uitnodigen</button>
            </div>
            <h2>Teamleden</h2>
            {members && members.map(item => (
              <div key={item.id} className='members-container'>
                <img src={item.photo} alt="" />
                <p>{item.userName}</p>
                <DeleteOutlineOutlinedIcon className='members-container-delete-button' data-docid={item.docid} onClick={deleteMember}/>
              </div>
            ))}
        </div>
    </div>
  )
}

export default Team