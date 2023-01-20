import { BrowserRouter } from 'react-router-dom';
import Navigation from './nav/Navigation';
import { AuthProvider } from './state/Auth';
import { DataProvider } from './state/Data';

function App() {
  return (
    <BrowserRouter key='router'>
      <DataProvider>
        <AuthProvider>
          <Navigation/>
        </AuthProvider>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
