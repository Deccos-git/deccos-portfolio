import { useEffect } from 'react'
import { useFirestoreGeneralTwo } from '../../firebase/useFirestore'
import OutputData from '../synchronisations/OutputData'
import { useState } from 'react'
import OutputsGraph from '../outputs/OutputsGraph'
import ProjectMeta from '../synchronisations/ProjectMeta'

const DashboardOutputResults = ({outputId}) => {
    // State
    const [data, setData] = useState([])

    //Hooks
    const projectOutputData = OutputData()

    // Firestore
    const syncs = useFirestoreGeneralTwo('synchronisations', 'status', 'accepted', 'syncItem', outputId)

    // Get projectOutput from syncs
    useEffect(() => {

        const array = []

        syncs && syncs.map(sync => {
            const projectOutput = sync.projectOutput

            projectOutputData && projectOutputData.map(item => {
                if(item.OutputID === projectOutput){
                    const timestamp = new Date(item.Timestamp._seconds * 1000);
                    const month = timestamp.getMonth() + 1
                    const year = timestamp.getFullYear()
                    const object = {
                        Maand: `${month}-${year}`,
                        Resultaat: item.Result,
                        ProjectID: [item.CompagnyID],
                        ResultID: item.ID
                    }

                    array.push(object)
                }
            })
        })

        const dataArraySortedByMonth = combineItemsByMonth(array)

        setData(dataArraySortedByMonth)

    }, [syncs, outputId, projectOutputData])

    // Combine items by month, add up the results and combine the projectIDs
    const combineItemsByMonth= (items) => {
        const combined = {};

        items.forEach(item => {
            if (combined[item.Maand]) {
            combined[item.Maand].Resultaat += item.Resultaat;
            combined[item.Maand].ProjectID = [...combined[item.Maand].ProjectID, ...item.ProjectID];
            } else {
            combined[item.Maand] = { ...item };
            }
        });

        const combinedArray = Object.values(combined).map(item => {
            item.ProjectID = [...new Set(item.ProjectID)];
            return item;
        });

        // Sort the combined array by Maand, considering full dates
        combinedArray.sort((a, b) => {
            const [monthA, yearA] = a.Maand.split('-').map(Number);
            const [monthB, yearB] = b.Maand.split('-').map(Number);
            const dateA = new Date(yearA, monthA - 1); // JavaScript months are 0-indexed
            const dateB = new Date(yearB, monthB - 1);
            return dateA - dateB;
        });

        return combinedArray;
      }

    console.log(data)

    const CustomTooltip = ({ active, payload}) => {
        if (active && payload && payload.length) {
          return (
            <div className="custom-tooltip">
                <p><b>Datum</b></p>
                <p>{payload[0]?.payload.Maand}</p>
                <p><b>Resultaat</b></p>
                <p>{payload[0]?.payload.Resultaat}</p>
                <div>
                    <p><b>Organisaties</b></p>
                    <ul>
                        {payload[0]?.payload.ProjectID.map((project, index) => {
                            return <li key={index}><ProjectMeta projectId={project}/></li>
                        })}
                    </ul>
                </div>
            </div>
          );
        }
      
        return null;
      };

  return (
    <OutputsGraph data={data} customTooltip={<CustomTooltip/>} />
  )
}

export default DashboardOutputResults