import {
    LineChart,
    XAxis,
    YAxis,
    Line,
    Legend,
    ReferenceLine,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
  } from "recharts";
  import ThemeOutputResults from "../data/ThemeOutputResults";
  import { useEffect, useState } from "react";

const OutputsTotal = ({themeId, themeOutputId, KPI}) => {

    const themeOutputResults = ThemeOutputResults(themeOutputId, themeId)

    console.log(themeOutputResults)
    
    // Filter the companies from the data
    const companies = themeOutputResults ? Object.keys(themeOutputResults[0] ? themeOutputResults[0] : []).filter(item => item !== 'name') : []

    return (
        <div className='activity-meta-title-container'>
           <ResponsiveContainer width='100%' height={200}>
            <LineChart
            width={500}
            height={300}
            data={themeOutputResults ? themeOutputResults : []}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            {/* <Legend /> */}
            <ReferenceLine y={KPI} label="KPI" stroke="red" />
            {companies && companies.map((compagny, index) => (
                <Line key={`line-${index}`} type="monotone" dataKey={compagny} output={compagny} strokeWidth='3'/>
            ))}
            </LineChart>
          </ResponsiveContainer>
      </div>
      )
}

export default OutputsTotal