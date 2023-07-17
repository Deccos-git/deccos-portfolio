import OutputLineChartWithReferenceLine from "../graphs/OutputLineChartWithReferenceLine"

const OutputResults = ({output}) => {


    const data = [
        {
            name: '02-2023',
            uv: 3000,
            deelnemers: 1398,
            amt: 2210,
          },
          {
            name: '02-2023',
            uv: 3000,
            deelnemers: 1398,
            amt: 2210,
          },
        {
          name: '01-2023',
          deelnemers: 2400,
        },
        {
            name: '06-2023',
            uv: 2390,
            deelnemers: 3800,
            amt: 2500,
          },
        {
            name: '04-2023',
            uv: 2780,
            deelnemers: 3908,
            amt: 2000,
          },
          {
            name: '05-2023',
            uv: 1890,
            deelnemers: 4800,
            amt: 2181,
          },
        {
          name: '03-2023',
          uv: 2000,
          deelnemers: 5200,
          amt: 2290,
        },
    
      ];

  return (
    <div className="graph-container">
        <OutputLineChartWithReferenceLine data={data} label='Doel' kpi={output.goal} dataKey={'deelnemers'} />
    </div>
    
  )
}

export default OutputResults