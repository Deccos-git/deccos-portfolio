import Location from "../../helpers/Location";
import { useFirestoreGeneral } from "../../firebase/useFirestore";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useFirestoreArrayContains } from "../../firebase/useFirestoreDeccos";
import { useState, useEffect } from "react";
import uuid from "react-uuid";
import { db } from "../../firebase/config";
import { db as dbDeccos } from "../../firebase/configDeccos";
import Hostname from "../../helpers/Hostname";
import { doc, setDoc, deleteDoc, serverTimestamp} from "firebase/firestore"; 

const Userroles = () => {
  const [adminID, setAdminID] = useState("")
  const [adminName, setAdminName] = useState("")
  const [adminPhoto, setAdminPhoto] = useState("")
  const [adminEmail, setAdminEmail] = useState("")
  const [organisationName, setOrganisationName] = useState('')

  const client = Location()[3]
  const host = Hostname()

  const admins = useFirestoreGeneral('admins', 'compagnyID', client)
  const users = useFirestoreArrayContains('Users',  'Finpact', client)
  const organisatons = useFirestoreGeneral('compagnies', 'id', client)

  useEffect(() => {
    organisatons && organisatons.forEach(item => {
      setOrganisationName(item.compagny)
    })

  },[organisatons])

  const adminHandler = (e) => {

    const id = e.target.options[e.target.selectedIndex].dataset.id
    const photo = e.target.options[e.target.selectedIndex].dataset.photo
    const username = e.target.options[e.target.selectedIndex].dataset.name
    const email = e.target.options[e.target.selectedIndex].dataset.email

    setAdminID(id)
    setAdminName(username)
    setAdminPhoto(photo)
    setAdminEmail(email)

  }

  const deleteAdmin = (e) => {

  }

  const addAdmin = async(e) => {

    await setDoc(doc(db, "admins", uuid()), {
      compagnyID: client,
      name: adminName,
      photo: adminPhoto,
      userId: adminID,
      email: adminEmail,
      id: uuid(),
      timestamp: serverTimestamp()
    })

    sendEmail()
  }

  const sendEmail = async () => {

    await setDoc(doc(dbDeccos, "Email", uuid()),{
      to: [adminEmail],
      cc: "info@Deccos.nl",
      message: {
      subject: `Je bent als beheerder toegevoegd op ${organisationName}`,
      html: `Hallo ${adminName}, </br></br>
          Je bent door een beheerder van de ${host.Name} ${host.Text} van ${organisationName} toegevoegd als beheerder.<br><br>

          Dat betekent dat je vanaf nu:<br><br>

          <ul>
              <li>Algemene instellingen kunt aanpassen.</li>
              <li>Teamleden kunt uitnodigen en verwijderen.</li>
              <li>Gebruikersrollen kan wijzigen.</li>
          </ul><br><br>
          
          Vriendelijke groet, </br></br>
          Team ${host.Name} </br></br>
          `,
      Gebruikersnaam: `${adminName}`,
      Emailadres: adminEmail,
      Type: "Verification mail",
      timestamp: serverTimestamp()
      }
    })
  }

  return (
    <div className='page-container'>
        <div className='page-top-container'>
            <h1>Gebruikersrollen</h1>
        </div>
        <div className="divider">
            <h2>Admins</h2>
            <p>De admin rol geeft toegang tot de volgende beheersopties:</p>
            <ul>
                <li>Algemene instellingen aanpassen</li>
                <li>Teamleden uitnodigen en verwijderen</li>
                <li>Gebruikersrollen wijzigen</li>
            </ul>
            <h4>Leden met rol admin</h4>
            {admins && admins.map(admin => (
                <div className="userrole-users-container" key={admin.id}>
                    <img src={admin.photo} alt="" />
                    <p>{admin.name}</p>
                    <DeleteOutlineOutlinedIcon className='members-container-delete-button' data-docid={admin.docid} onClick={deleteAdmin}/>
                </div>
            ))}
            <h4>Admin toevoegen</h4>
            <select className="userrole-select" name="" id="" onChange={adminHandler}>
                <option value="">--- Selecteer ---</option>
                {users && users.map(user => (
                    <option data-id={user.ID} data-name={user.UserName} data-photo={user.Photo} data-email={user.Email} key={user.ID}>{user.UserName}</option>
                ))}
            </select>
            <div className="button-userrole-container">
                <button className="button-simple" onClick={addAdmin}>Toevoegen</button>
            </div>
        </div>
    </div>
  )
}

export default Userroles