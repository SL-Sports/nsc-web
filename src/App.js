import './App.css';
import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    // Switch,
    Route,
    // Link
} from "react-router-dom";

import Webpages from './webpages/index';
import Auth from './webpages/auth/auth';

function App() {
  const [token, setToken] = useState("");

  if (token === "") {
    return (
      <div className="App">
        <Router>
          <Redirect to="/auth" />
          <Route exact path="/">
              <Webpages />
          </Route>
          <Route path="/auth">
              <Auth setToken = {setToken} />
          </Route>
        </Router>
      </div>
    );
  }

  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <Webpages />
        </Route>
        <Route path="/auth">
          <Redirect to="/" />
          <Auth setToken = {setToken} />
        </Route>
      </Router>
    </div>
  );
}

export default App;
