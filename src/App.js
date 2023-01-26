import { BrowserRouter } from 'react-router-dom';
import Navigation from './nav/Navigation';
import { AuthProvider } from './state/Auth';
import { DataProvider } from './state/Data';
import { SettingsProvider } from './state/Settings';

function App() {
  return (
    <BrowserRouter key='router'>
      <DataProvider>
        <AuthProvider>
          <SettingsProvider>
            <Navigation/>
          </SettingsProvider>
        </AuthProvider>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
