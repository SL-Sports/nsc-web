import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRouter from "../auth/privateRouter";
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
        <PrivateRouter path="/activities" component={Activities} />
        {/* Payments */}
        <PrivateRouter path="/payments" component={Payments} />
        {/* Profiles */}
        <PrivateRouter path="/profiles" component={Profiles} />
        {/* Rankings */}
        <PrivateRouter path="/rankings" component={Rankings} />

        {/* Association Dashboard */}
        <PrivateRouter path="/dashboard" component={AssociationDashboard} />

        {/* NSC Dashboard */}
        <PrivateRouter exact path="/" nscOnly component={NSCDashboard} />

        {/* NoMatch */}
        <PrivateRouter path="*" component={NoMatch} />
      </Switch>
    </Router>
  );
}
