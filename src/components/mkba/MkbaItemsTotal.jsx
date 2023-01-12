import { useEffect, useState } from "react"
import { useFirestoreMkbaTotal } from "../../firebase/useFirestoreDeccos"

const MkbaItemsTotal = ({mkbaSet, setTotal, total}) => {
    const [itemTotal, setItemTotal] = useState(0)

    const mkbaItems = useFirestoreMkbaTotal(mkbaSet.ID)

    const calculateTotalBenefits = () => {

      mkbaItems && mkbaItems.forEach(item => {
        setItemTotal(item.Amount)
      })
    }

    useEffect(() => {
      calculateTotalBenefits()
    },[mkbaItems])

    console.log(itemTotal)

  return (
    <div>
      {mkbaItems && mkbaItems.map(item => (
        <p key={item.ID}>{item.Amount}</p>
      ))}
    </div>
  )
}

export default MkbaItemsTotal