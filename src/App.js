import './App.css';
import React from 'react';
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
import LogoutButton from './webpages/auth/logout';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  let authRedir;
  let authComponent;

  function setToken(value) {
    setCookie('token', value, {path: '/'});
  }

  if (!cookies.token) {
    // Not logged in
    console.log("Not logged in");
    authRedir = <Redirect to="/auth" />;
    authComponent = <Auth setToken={setToken} />;
  } else {
    // Logged in
    console.log("Logged in");
    authRedir = <></>;
    authComponent = <Redirect to="/" />;
  }

  console.log(cookies.token);

  return (
    // Cookies
    <CookiesProvider>
      <div className="App">

        <div className="testing">
          {cookies.token}
        </div>

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

        {/* If logged in display LogoutButton */}
        {cookies.token && <LogoutButton onClick={() => removeCookie('token')} />}
      </div>
    </CookiesProvider>
  );
}

export default App;
