import { useFirestoreGeneral } from "../../firebase/useFirestore"
import OutputLineChartWithReferenceLine from "../graphs/OutputLineChartWithReferenceLine"

const PackageBuilderPairs = ({item}) => {

    const packageCompagnyPairs = useFirestoreGeneral('packageCompagnyPairs', 'packageId', item.id)

    const data = [
        {
            name: '2-23',
            organisations: 0,
          },
          {
            name: '2-23',
            organisations: 3,
          },
        {
          name: '1-23',
          organisations: 8,
        },
        {
            name: '6-23',
            organisations: 14,
          },
        {
            name: '4-23',
            organisations: 25,
          },
          {
            name: '5-23',
            organisations: 32,
          },
        {
          name: '3-23',
          organisations: 45,
        },
    
      ];

  return (
    <div className="graph-container">
        <OutputLineChartWithReferenceLine data={data} label='Maximum' kpi={item.maximum} dataKey={'organisations'} />
    </div>
  )
}

export default PackageBuilderPairs