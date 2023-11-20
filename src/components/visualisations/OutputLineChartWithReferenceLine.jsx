import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
  } from 'recharts';

const OutputLineChartWithReferenceLine = ({data, label, kpi, dataKey, deadline, deadlineLabel}) => {

      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 50,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <ReferenceLine y={kpi} label={label} stroke="red"  strokeWidth={'3px'}/>
            <ReferenceLine x={deadline} stroke="red" label={deadlineLabel} strokeWidth={'3px'}/>
            <Line type="monotone" dataKey={dataKey} stroke="#8884d8" strokeWidth={'3px'} />
          </LineChart>
        </ResponsiveContainer>
      );
}

export default OutputLineChartWithReferenceLine