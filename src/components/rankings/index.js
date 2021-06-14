import { CssBaseline } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import RankingsHome from "./pages/rankingsHome";
import EditRanking from "./pages/editRanking";
import NewRanking from "./pages/newRanking";

export default function Rankings() {
  return (
    <Router basename="rankings/">
      <CssBaseline />
      <Switch>
        <Route exact path="/" component={RankingsHome} />
        <Route exact path="/new" component={NewRanking} />
        <Route exact path="/edit/:rankingID" component={EditRanking} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
}

function NoMatch() {
  return <h1>404 Page Not Found</h1>;
}
