import { CssBaseline } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ActivityDetail from "./pages/activityDetail";

export default function Activities() {
  return (
    <Router basename="activities/">
      <CssBaseline />
      <Switch>
        <Route exact path="/:activityId" component={ActivityDetail} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
}

function NoMatch() {
  return <h1>404 Page Not Found</h1>;
}
