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
import { Container } from '@material-ui/core';

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

  console.log('Token: ' + cookies.token);

  return (
    // Cookies
    <CookiesProvider>
      <Container>
        <div className="App">

          <div className="debug">
            {/* {cookies.token} */}
          </div>

          <Router>
            {authRedir}

            <Switch>
              {/* Send /auth to Auth stuff if not logged in */}
              <Route path="/auth">
                {authComponent}
              </Route>

              {/* Send everything else to Webpages */}
              <Route path="/">
                <Webpages />
              </Route>
            </Switch>

          </Router>

          {/* If logged in display LogoutButton */}
          {cookies.token && <LogoutButton onClick={() => removeCookie('token')} />}
        </div>
      </Container>
    </CookiesProvider>
  );
}

export default App;
