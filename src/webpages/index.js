import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import Home from './home/home';

function Webpages() {
    return(
      <Router>
        <Switch>
          <Route exact path="/" >
              <Home />
          </Route>
          <Route path="/auth">
              <Redirect to="/" />
          </Route>
          <Route path="*">
              <NoMatch />
          </Route>
        </Switch>
      </Router>
    );
};

function NoMatch() {
    return (
        <div>
            <h1>
                Error 404
            </h1>
            <p>
                Page not found
            </p>
        </div>
    )
}
export default Webpages;