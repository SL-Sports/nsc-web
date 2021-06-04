import React from "react";
import COLORS from "../../colors";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Activities from "../activities";
import Profiles from "../profiles";
import Payments from "../payments";

function Home() {
  return <h1 style={{ color: COLORS.blueGradientStart }}>Home</h1>;
}

function NoMatch() {
  return <h1>404 Page Not Found</h1>;
}

export default function Routes() {
  return (
    <Router>
      <Switch>
        {/* TODO: Auth */}
        {/* Activities */}
        <Route path="/activities" component={Activities} />
        {/* Payments */}
        <Route path="/payments" component={Payments} />
        {/* Profiles */}
        <Route path="/profiles" component={Profiles} />
        {/* Home */}
        <Route exact path="/" component={Home} />
        {/* NoMatch */}
        <Route path="*" component={NoMatch} />
      </Switch>
    </Router>
  );
}
