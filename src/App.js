import './App.css';
import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from "react-router-dom";
import {
  CookiesProvider,
  useCookies,
} from 'react-cookie';

import Webpages from './webpages/index';
import Auth from './webpages/auth/auth';

function App() {
  const [token, setToken] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  let authRedir;
  let authComponent;

  if (token === "") {
    authRedir = <Redirect to="/auth" />;
    authComponent = <Auth setToken={setToken} />;
  } else {
    authRedir = <></>;
    authComponent = <Redirect to="/" />;
  }

  return (
    // Cookies
    <CookiesProvider>
      <div className="App">
        <Router>
          {authRedir}
            
          <Switch>
            {/* Send /auth to auth stuff */}
            <Route path="/auth">
              {authComponent}
            </Route>

            <Route path="/">
              <Webpages />
            </Route>
          </Switch>
        </Router>
      </div>
    </CookiesProvider>
  );
}

export default App;
