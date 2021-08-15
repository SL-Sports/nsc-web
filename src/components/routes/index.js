import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "../../features/auth";
import Activities from "../activities";
import Profiles from "../profiles";
import Payments from "../payments";
import LogIn from "../auth/logIn";
import SignUp from "../auth/signUp";
import Forgot from "../auth/forgot";
import Rankings from "../rankings";
import NSCDashboard from "../nsc/pages/nscDashboard";
import AssociationDashboard from "../dashboard";

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
        <PrivateRoute path="/activities" component={Activities} />
        {/* Payments */}
        <PrivateRoute path="/payments" component={Payments} />
        {/* Profiles */}
        <PrivateRoute path="/profiles" component={Profiles} />
        {/* Rankings */}
        <PrivateRoute path="/rankings" component={Rankings} />

        {/* Association Dashboard */}
        <PrivateRoute path="/dashboard" component={AssociationDashboard} />

        {/* NSC Dashboard */}
        <PrivateRoute exact path="/" nscOnly component={NSCDashboard} />

        {/* NoMatch */}
        <PrivateRoute path="*" component={NoMatch} />
      </Switch>
    </Router>
  );
}
