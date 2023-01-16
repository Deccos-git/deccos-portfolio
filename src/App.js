import { BrowserRouter } from 'react-router-dom';
import Navigation from './nav/Navigation';
import { AuthProvider } from './state/Auth';
import { DataProvider } from './state/Data';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter key='router'>
          <Navigation/>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
