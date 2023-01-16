import { useState, useEffect } from "react"
import { useFirestoreResults } from "../../firebase/useFirestoreDeccos"

const MilestoneProgress = ({milestone}) => {
    const [progress, setProgress] = useState([])

    const results = useFirestoreResults(milestone.OutputID)

    const progressArray = []

    useEffect(() => {
        results && results.forEach(result => {

            progressArray.push(result.Result)

            setProgress(progressArray)

        })

    },[results])

    const sum = progress.reduce((partialSum, a) => partialSum + a, 0);
    
    const width = sum*100/milestone.Number

     const succesColor = () => {
        if(milestone.Succes === true){
            return '#00cd00'
        } else {
            return '#63cadc'
        }
     }

     const total = () => {

        if(sum > milestone.Number){
            return `${milestone.Number} of meer`
        } else {
            return sum
        }
     }

     const percentage = () => {
         if(width > 100){
             return `(100%)`
         } else {
            return `(${(Math.round(width * 100) / 100).toFixed(2)}%)`
         }
     }

  return (
    <div className='milestone-progress-container'>
        <div className='percentage-container'>
            <p>Huidig: {total()} {percentage()}</p>
            <p>Doel: {milestone.Number}</p>
        </div>
        
        <div className='progressbar-outer-bar'>
            <div className='progressbar-progress' style={{width: `${width}%`, backgroundColor: succesColor()}}></div>
        </div>
    </div>
  )
}

export default MilestoneProgress