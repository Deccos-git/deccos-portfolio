import { useState, useEffect } from 'react'
import SimpleLineChart from '../visualisations/SimpleLineChart';
import { functionsDeccos } from "../../firebase/configDeccos";
import { httpsCallable } from "firebase/functions";
import Location from "../../helpers/Location";
import { useFirestoreGeneralFour } from "../../firebase/useFirestore";

const IndicatorData = ({indicator, effectId}) => {// State
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    
    // Hooks
    const portfolioId = Location()[3]
    
    // Firestore
    const syncs = useFirestoreGeneralFour(
     'synchronisations', 'portfolioId', 
     portfolioId ? portfolioId : '', 
     'syncItem', effectId ? effectId : '', 
     'status', 'accepted',
     'type', 'effect')
    
     // Get the project results for the syncs
     useEffect(() => {
        if (syncs) {
    
          setLoading(true)
    
    
          const promises = syncs.map(sync => {
            return (async () => {
              const sendEffectData = httpsCallable(functionsDeccos, 'sendEffectData');

              const dataToSend = {
                effectId: sync.projectEffect,
                indicatorQuestion: indicator.question
              };
              try {
                const result = await sendEffectData({ data: dataToSend });
    
                setLoading(false)
    
                return result.data; // Return the data to be collected
              } catch (error) {
                console.error(error);
                return null; // Return null or appropriate error handling
              }
            })();
          });
      
          Promise.all(promises).then(results => {
            setData(results)
    
          });
        }
      }, [syncs]);

      // Joined array of all the data
      const joinedArray = data.flat();

      // Reduce the array by measureMoment with average calculation
     // Group by measureMoment and include companyName averages
  const groupedResult = joinedArray.reduce((acc, item) => {
    // Find or create the group for the current measureMoment
    let group = acc.find(g => g.measureMoment === item.measureMoment);
    if (!group) {
      group = { 
        measureMoment: item.measureMoment, 
        items: [], 
        companyNameAverages: {}, 
        totalInput: 0, 
        count: 0, 
        totalAverage: 0 
      };
      acc.push(group);
    }

    // Add the item to the group
    group.items.push(item);

    // Update totalInput and count for total average
    group.totalInput += item.input;
    group.count += 1;

    // Aggregate inputs by companyName within the group
    if (!group.companyNameAverages[item.companyName]) {
      group.companyNameAverages[item.companyName] = { totalInput: 0, count: 0 };
    }
    group.companyNameAverages[item.companyName].totalInput += item.input;
    group.companyNameAverages[item.companyName].count += 1;

    return acc;
  }, []);

  // Calculate averages for each group
  groupedResult.forEach(group => {
    // Calculate the total average
    group.totalAverage = group.totalInput / group.count;

    // Calculate the average for each companyName
    for (const companyName in group.companyNameAverages) {
      const data = group.companyNameAverages[companyName];
      group.companyNameAverages[companyName] = data.totalInput / data.count;
    }
  });

  // Format the groupedResult into the graph structure
  const formattedData = groupedResult.map(group => ({
    measureMoment: group.measureMoment.toString(), // Convert measureMoment to string
    totalAverage: group.totalAverage, // Keep totalAverage as it is
    companyNameAverages: group.companyNameAverages // Use companyNameAverages directly
  }));

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const totalAverage = payload.find(entry => entry.dataKey === "totalAverage")?.value;
      const companyAverages = payload
        .filter(entry => entry.dataKey.startsWith("companyNameAverages"))
        .map(entry => ({
          name: entry.name.replace("companyNameAverages.", ""), // Extract company name
          value: entry.value,
          color: entry.color, // Include color
        }));
  
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: 10, border: '1px solid #ccc' }}>
          <h3 className="label"><strong>Moment:</strong> {label}</h3>
          <p>
            <strong style={{ color: payload.find(entry => entry.dataKey === "totalAverage")?.color }}>
              Gemiddelde score:
            </strong>{' '}
            {totalAverage}
          </p>
          {companyAverages.map((company, index) => (
            <p key={index}>
              <strong style={{ color: company.color }}>{company.name}:</strong> {company.value}
            </p>
          ))}
        </div>
      );
    }
  
    return null;
  };
  

  // Custom Legend Component
  const CustomLegend = ({ payload, data }) => {
    console.log(data)
    // Calculate percentage growth for each line
    const calculateGrowth = (key) => {
      const filteredData = data && data.map((d) => d[key]).filter((value) => value !== undefined);
      if (filteredData.length >= 2) {
        const firstValue = filteredData[0];
        const lastValue = filteredData[filteredData.length - 1];
        const growth = ((lastValue - firstValue) / firstValue) * 100;
        return `${growth.toFixed(2)}%`;
      }
      return "N/A"; // Return "N/A" if insufficient data
    };
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', margin: '10px' }}>
        {payload.map((entry, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: entry.color,
                marginRight: '8px',
              }}
            ></div>
            <span>
              {console.log(entry)}
              {entry.value === 'totalAverage'? 
              'Gemiddelde score' : 
              entry.value.replace("companyNameAverages.", "")
               } ({calculateGrowth(entry.dataKey)})
            </span>
          </div>
        ))}
      </div>
    );
  };
  

  return (
    <div className='chart-container'>
      <SimpleLineChart data={formattedData} tooltip={CustomTooltip} legend={CustomLegend} />
    </div>
  )
}

export default IndicatorData