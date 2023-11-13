import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
  } from "recharts";

const OutputsTotal = ({data}) => {
    return (
        <div className='activity-meta-title-container'>
           <ResponsiveContainer width='100%' height={200}>
              <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0
              }}
                >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Maand" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="Resultaat" stroke="#f48183" fill="#f48183" />
            </AreaChart>
          </ResponsiveContainer>
      </div>
      )
}

export default OutputsTotal