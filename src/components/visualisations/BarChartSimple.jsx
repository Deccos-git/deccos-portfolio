import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartSimple = () => {

    const data = [
        {
          name: 'Cursus 1',
          voor: 4000,
          na: 2400,
          amt: 2400,
        },
        {
          name: 'Cursus 2',
          voor: 3000,
         na: 1398,
          amt: 2210,
        },
        {
          name: 'Cursus 3',
          voor: 2000,
         na: 9800,
          amt: 2290,
        },
        {
          name: 'Cursus 4',
          voor: 2780,
         na: 3908,
          amt: 2000,
        },
        {
          name: 'Cursus 5',
          voor: 1890,
         na: 4800,
          amt: 2181,
        },
        {
          name: 'Cursus 6',
          voor: 2390,
         na: 3800,
          amt: 2500,
        },
        {
          name: 'Cursus 7',
          voor: 3490,
         na: 4300,
          amt: 2100,
        },
      ];

    return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={'name'} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="voor" fill="#8884d8" />
            <Bar dataKey="na" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      );
}

export default BarChartSimple