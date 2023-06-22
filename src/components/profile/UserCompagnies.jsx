import SwitchAccountCompagnyMeta from "./SwitchAccountCompagnyMeta"

const UserCompagnies = ({user}) => {

    const compagnies = user.Finpact

  return (
    <>
        {compagnies && compagnies.map(item => (
            <SwitchAccountCompagnyMeta compagny={item}/>
        ))}
    </>
  )
}

export default UserCompagnies