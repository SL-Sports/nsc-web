import { CssBaseline } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import RankingsHome from "./pages/rankingsHome";
import EditRanking from "./pages/editRanking";
import NewRanking from "./pages/newRanking";
import Routes from "../routes";

export default function Rankings() {
  return (
    <Router>
      <CssBaseline />
      <Switch>
        <Route exact path="/rankings" component={RankingsHome} />
        <Route exact path="/rankings/new" component={NewRanking} />
        <Route exact path="/rankings/edit/:rankingID" component={EditRanking} />
        <Route component={Routes} />
      </Switch>
    </Router>
  );
}

function NoMatch() {
  return <h1>404 Page Not Found</h1>;
}
