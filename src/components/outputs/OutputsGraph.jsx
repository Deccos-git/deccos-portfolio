import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
  import spinner from "../../assets/spinner-ripple.svg";

const OutputsGraph = ({data, customTooltip}) => {
  const loading = data.length === 0 ? true : false

  // Collect all unique IDs
  const uniqueIds = data.reduce((acc, item) => {
    Object.keys(item).forEach(key => {
      if (key !== 'Maand' && key !== 'Total' && !acc.includes(key)) {
        acc.push(key);
      }
    });
    return acc;
  }, []);


  const getRandomColor = () => {
    // Generate a random RGB color
    const r = Math.floor(Math.random() * 256); // Random between 0-255
    const g = Math.floor(Math.random() * 256); // Random between 0-255
    const b = Math.floor(Math.random() * 256); // Random between 0-255
    return `rgb(${r},${g},${b})`; // Return RGB color string
  }
  

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
            <Tooltip />
            <Area type="monotone" dataKey="Total" stroke="#f48183" fill="#f48183" />
            {uniqueIds.map((id, index) => (
              <Area key={id} type="monotone" dataKey={id} stroke="#47acc3" stackId={id} fill="#47acc3" fillOpacity={0.3}/>
            ))}
          </AreaChart>
        </ResponsiveContainer>
    </div>
    }
  </>
  )
}

export default OutputsGraph