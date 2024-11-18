import { Data } from "../../state/Data";
import { useContext, useEffect, useState } from "react";
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { httpsCallable } from "firebase/functions";
import { functionsDeccos } from "../../firebase/configDeccos";

const Projects = () => {
  // Context
  const compagnyData = useContext(Data);

  // State to store fetched table data and error messages
  const [tableData, setTableData] = useState({});
  const [error, setError] = useState(null);

  // Fetch admin panel data for each company ID
  useEffect(() => {
    if (compagnyData && compagnyData[0]) {
      compagnyData[0].forEach(item => {
        getData(item.CompagnyID);
      });
    }
  }, [compagnyData]);

  const getData = (id) => {
    const createSync = httpsCallable(functionsDeccos, 'adminPanelData');

    createSync({ data: { compagnyId: id } })
      .then((result) => {
        setTableData(prev => ({ ...prev, [id]: result.data }));
      })
      .catch((error) => {
        console.error(error);
        setError(`Error fetching data for company ID ${id}`);
      });
  };

  console.log(tableData);

  // Helper function to structure the table items
  const tableItems = (data) => {
    return (
      <>
        <td>
        <div className="adminpaneldata-table-item-container" >
          <p >Maatschappelijk probleem</p>
          <p style={{color: data.impactStrategy?.societalProblem ? 'black' : 'red'}}>{data.impactStrategy?.societalProblem ? 'Ja' : 'Nee'}</p>
        </div>
        <div className="adminpaneldata-table-item-container">
          <p>Doelgroepen</p>
          <p style={{color: data.impactStrategy?.targetGroups > 0 ? 'black' : 'red'}}>{data.impactStrategy?.targetGroups}</p>
        </div>
        <div className="adminpaneldata-table-item-container">
          <p>Impactdoel</p>
          <p style={{color: data.impactStrategy?.goal? 'black' : 'red'}}>{data.impactStrategy?.goal ? 'Ja' : 'Nee'}</p>
        </div>
        <div className="adminpaneldata-table-item-container">
          <p>Activiteiten</p>
          <p style={{color: data.impactStrategy?.activities > 0 ? 'black' : 'red'}}>{data.impactStrategy?.activities}</p>
        </div>
        <div className="adminpaneldata-table-item-container">
          <p>Outputs</p>
          <p style={{color: data.impactStrategy?.outputs > 0 ? 'black' : 'red'}}>{data.impactStrategy?.outputs}</p>
        </div>
        <div className="adminpaneldata-table-item-container">
          <p>Effecten</p>
          <p style={{color: data.impactStrategy?.effects > 0 ? 'black' : 'red'}}>{data.impactStrategy?.effects}</p>
        </div>
      </td>
      <td>
        <div className="adminpaneldata-table-item-container">
          <p>Aantal storytelling</p>
        </div>
      </td>
      <td>
        <div className="adminpaneldata-table-item-container">
          <p>Aantal resultaten</p>
          <p style={{color: data.outputs?.results > 0 ? 'black' : 'red'}}>{data.outputs?.results}</p>
        </div>
        <div className="adminpaneldata-table-item-container">
          <p>Laatste toegevoegd</p>
          <p>{data.outputs?.latestResultAdded}</p>
        </div>
      </td>
      <td>
        <div className="adminpaneldata-table-item-container">
          <p>Aantal onderzoeken</p>
          <p style={{color: data.research?.numberOfResearches > 0 ? 'black' : 'red'}}>{data.research?.numberOfResearches}</p>
        </div>
        <div className="adminpaneldata-table-item-container">
          <p>Aantal responses</p>
          <p style={{color: data.research?.responses > 0 ? 'black' : 'red'}}>{data.research?.responses}</p>
        </div>
        <div className="adminpaneldata-table-item-container">
          <p>Laatst toegevoegd</p>
          <p>{data.research?.latestResponsAdded}</p>
        </div>
      </td>
      <td>
        <div className="adminpaneldata-table-item-container">
          <p>Aantal livereports</p>
          <p style={{color: data.liveReports?.numberOfLiveReports > 0 ? 'black' : 'red'}}>{data.liveReports?.numberOfLiveReports}</p>
        </div>
        <div className="adminpaneldata-table-item-container">
          <p>Laatst toegevoegd</p>
          <p>{data.liveReports?.latestLiveReportAdded}</p>
        </div>
      </td>
      
      </>
    );
  };

  return (
    <div className='page-container'>
      <div className='page-top-container'>
        <h1>Projecten</h1>
        {compagnyData && compagnyData[0] && (
          <p>{compagnyData[0].length}</p>
        )}
      </div>
      <div className='table-container'>
        {error && <p className="error-message">{error}</p>}
        <table>
          <thead>
            <tr>
              <th>PROJECT</th>
              <th>IMPACT STRATEGIE</th>
              <th>STORYTELLING</th>
              <th>OUTPUTS</th>
              <th>ONDERZOEKEN</th>
              <th>LIVE REPORTS</th>
              <th>PROJECTOMGEVING</th>
            </tr>
          </thead>
          <tbody>
            {compagnyData[0] && compagnyData[0].map(item => (
              <tr key={item.ID}>
                <td>
                  <p>{item.CommunityName}</p>
                </td>
                  {tableData[item.CompagnyID]
                    ? tableItems(tableData[item.CompagnyID])
                    : 'Loading...'
                  }
                <td>
                  <a href={`https://impactdashboard.deccos.nl/${item.CompagnyID}`} target="_blank" rel="noopener noreferrer">
                    <OpenInNewOutlinedIcon />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;
