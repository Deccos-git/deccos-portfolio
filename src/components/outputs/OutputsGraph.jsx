import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
  } from "recharts";
  import spinner from "../../assets/spinner-ripple.svg";

const OutputsGraph = ({data, customTooltip}) => {
  const loading = data.length === 0 ? true : false

  return (
    <>
      {loading ? 
        <div id="graph-loading-container">
            <img src={spinner} alt="spinner" className="spinner"/>
        </div>
      :
      <div className='activity-meta-title-container'>
        <ResponsiveContainer width='100%' height={200}>
            <AreaChart
            data={data && data}
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
            <Tooltip content={customTooltip}/>
            <Area type="monotone" dataKey="Resultaat" stroke="#f48183" fill="#f48183" />
          </AreaChart>
        </ResponsiveContainer>
    </div>
    }
  </>
  )
}

export default OutputsGraph