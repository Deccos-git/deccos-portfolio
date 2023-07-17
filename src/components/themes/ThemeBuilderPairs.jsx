import OutputLineChartWithReferenceLine from "../graphs/OutputLineChartWithReferenceLine"
import { collection, query, where, getDocs, orderBy, onSnapshot } from "firebase/firestore"; 
import { db } from "../../firebase/config";
import { useState, useEffect } from "react";
import Location from "../../helpers/Location";

const ThemeBuilderPairs = ({item}) => {

    const [data, setData] = useState([])

    const client = Location()[3]
    const options = { month: 'numeric', year: 'numeric'};

    // const data = [
    //     {
    //         name: '2-23',
    //         organisations: 0,
    //       },
    //       {
    //         name: '2-23',
    //         organisations: 3,
    //       },
    //     {
    //       name: '1-23',
    //       organisations: 8,
    //     },
    //     {
    //         name: '6-23',
    //         organisations: 14,
    //       },
    //     {
    //         name: '4-23',
    //         organisations: 25,
    //       },
    //       {
    //         name: '5-23',
    //         organisations: 32,
    //       },
    //     {
    //       name: '3-23',
    //       organisations: 45,
    //     },
    
    //   ];

      const getData = async () => {

        const array = []

        const col = collection(db, 'themeCompagnyPairs');
        const q = query(col, where('compagny', '==', client), where("themeId", '==', item.id, orderBy('createdAt', 'asc')));
        const snapshot = await getDocs(q);

        snapshot.forEach(doc => {
          const object = {
            name: doc.data().createdAt.toDate().toLocaleDateString("nl-NL", options),
            organisaties: snapshot.size
          }
          array.push(object)
        })

        setData(array)
      }

      useEffect(() => {
        getData()
      }, [])

  return (
    <div className="graph-container">
        <OutputLineChartWithReferenceLine data={data} label='Maximum' kpi={item.maximum} dataKey={'organisaties'} />
    </div>
  )
}

export default ThemeBuilderPairs