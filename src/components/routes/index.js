import React from "react";
import COLORS from "../../colors";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Activities from "../activities";
import Profiles from "../profiles";
import Payments from "../payments";
import LogIn from "../auth/logIn";
import SignUp from "../auth/signUp";
import Forgot from "../auth/forgot";
import Rankings from "../rankings";
import NSCDashboard from "../nsc/pages/nscDashboard";
import AssociationDashboard from "../dashboard";
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
        <Route path="/signup" component={SignUp} />
        <Route path="/forgot" component={Forgot} />

        {/* Activities */}
        <Route path="/activities" component={Activities} />
        {/* Payments */}
        <Route path="/payments" component={Payments} />
        {/* Profiles */}
        <Route path="/profiles" component={Profiles} />
        {/* Home */}
        <Route exact path="/" component={Home} />

        {/* Rankings */}
        <Route exact path="/rankings" component={Rankings} />

        {/* NSC Dashboard */}
        <Route exact path="/nsc" component={NSCDashboard} />

        {/* Association Dashboard */}
        <Route exact path="/dashboard" component={AssociationDashboard} />

        {/* NoMatch */}
        <Route path="*" component={NoMatch} />
      </Switch>
    </Router>
  );
}
