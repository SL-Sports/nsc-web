import { CssBaseline } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NewProfile from "./webpages/newProfile";
import ProfilesHome from "./webpages/profilesHome";
import ProfileView from "./webpages/profileView";

export default function Profiles() {
  return (
    <Router basename="profiles/">
      <CssBaseline />
      <Switch>
        <Route exact path="/" component={ProfilesHome} />
        <Route exact path="/new" component={NewProfile} />
        <Route exact path="/:profileID" component={ProfileView} />
        <Route exact path="/:profileID/edit" component={ProfileView} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
}

function NoMatch() {
  return <h1>404 Page Not Found</h1>;
}
