import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SimpleLineChart = ({data, tooltip: CustomTooltip, legend: CustomLegend}) => {

  return (
    <ResponsiveContainer width="100%" height="100%">
  <LineChart
    width={500}
    height={300}
    data={data && data.length > 0 ? data : []}
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    }}
  >
    {/* <CartesianGrid strokeDasharray="3 3" /> */}
    <XAxis dataKey="measureMoment" />
    <YAxis />
    <Tooltip content={<CustomTooltip />} />
    <Legend content={<CustomLegend data={data} />} />
    <Tooltip content={<tooltip/>} />
    
    {/* Line for total average */}
    <Line
      type="monotone"
      dataKey="totalAverage"
      stroke="#8884d8"
      activeDot={{ r: 8 }}
      strokeWidth={3}
    />
    
    {/* Dynamically create lines for each company */}
    {data &&
      data.length > 0 &&
      Object.keys(data[0].companyNameAverages).map((companyName, index) => (
        <Line
          key={companyName}
          type="monotone"
          dataKey={`companyNameAverages.${companyName}`}
          stroke={`hsl(${(index * 100) % 360}, 70%, 50%)`} // Dynamic color for each line
          dot={false}
          strokeWidth={3}
        />
      ))}
  </LineChart>
</ResponsiveContainer>

  )
}

export default SimpleLineChart