import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ProfilesHome from "./webpages/profilesHome";
import ProfileView from "./webpages/profileView";

export default function Profiles() {
  return (
    <Router basename="profiles/">
      <Switch>
        <Route exact path="/" component={ProfilesHome} />
        <Route path="/:profileID" component={ProfileView} />
      </Switch>
    </Router>
  );
}
