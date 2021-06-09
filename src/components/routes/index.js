import React from "react";
import COLORS from "../../colors";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Activities from "../activities";
import ActivityDetail from "../activities/activityDetail";
import ActivityTypes from "../activities/activityTypes";
import Profiles from "../profiles";
import Payments from "../payments";
import LogIn from "../auth/logIn";

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
        {/* Auth */}
        <Route path="/login" component={LogIn} />
        {/* Activities */}
        <Route path="/activities" component={Activities} />
        <Route path="/activity-detail/:activityId" component={ActivityDetail} />
        <Route path="/activity-types" component={ActivityTypes} />
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
