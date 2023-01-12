import { BrowserRouter } from 'react-router-dom';
import Navigation from './nav/Navigation';
import { AuthProvider } from './state/Auth';
import { OrganisationsProvider } from './state/Organisations';

function App() {
  return (
    <AuthProvider>
      <OrganisationsProvider>
        <BrowserRouter key='router'>
          <Navigation/>
        </BrowserRouter>
      </OrganisationsProvider>
    </AuthProvider>
  );
}

export default App;
