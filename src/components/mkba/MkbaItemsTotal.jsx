import { useEffect } from "react"
import { useFirestoreMkbaTotal } from "../../firebase/useFirestoreDeccos"

const MkbaItemsTotal = ({mkbaSet, total, setTotal}) => {

    const mkbaItems = useFirestoreMkbaTotal(mkbaSet.ID)

    const calculateTotalBenefits = () => {

      mkbaItems && mkbaItems.forEach(item => {
        console.log(item.Amount)
        setTotal(total + item.Amount)
      })
    }

    useEffect(() => {
      calculateTotalBenefits()
    },[mkbaItems])

  return (
    <div>
      {mkbaItems && mkbaItems.map(item => (
        <p key={item.ID}>{item.Amount}</p>
      ))}
    </div>
  )
}

export default MkbaItemsTotal