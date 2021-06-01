import './App.css';
import React from 'react';

import Routes from './components/routes';

function App() {

  return (
      <div className="App">

        <div className="debug">
          {/* {cookies.token} */}
        </div>

        <Routes />

      </div>
  );
}

export default App;
