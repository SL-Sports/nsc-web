import './App.css';
import React from 'react';
import {
  CookiesProvider,
  useCookies,
} from 'react-cookie';

import Routes from './components/routes';

function App() {

  return (
    // Cookies
    <CookiesProvider>
        <div className="App">

          <div className="debug">
            {/* {cookies.token} */}
          </div>

          <Routes />

        </div>
    </CookiesProvider>
  );
}

export default App;
