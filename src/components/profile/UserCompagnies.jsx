import CompagnyCard from "./CompagnyCard"

const UserCompagnies = ({user}) => {

    const compagnies = user.Finpact

    console.log(compagnies)

  return (
    <div className='card-container center-container'>
        {compagnies && compagnies.map(item => (
            <CompagnyCard compagny={item}/>
        ))}
    </div>
  )
}

export default UserCompagnies