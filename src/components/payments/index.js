import { CssBaseline } from "@material-ui/core";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRouter from "../auth/privateRouter";
import PaymentsHome from "./pages/paymentsHome";
import PaymentDetail from "./pages/paymentDetail";
import NewPayment from "./pages/newPayment";
import EditPayment from "./pages/editPayment";

import Routes from "../routes";

export default function Payments() {
  return (
    <Router>
      <CssBaseline />
      <Switch>
        <Route exact path="/payments" component={PaymentsHome} />
        <PrivateRouter
          nscOnly
          exact
          path="/payments/new"
          component={NewPayment}
          redirectUrl="/payments"
        />
        <PrivateRouter
          nscOnly
          exact
          path="/payments/edit/:paymentID"
          component={EditPayment}
          redirectUrl="/payments"
        />
        <Route exact path="/payments/:paymentID" component={PaymentDetail} />

        <Route component={Routes} />
      </Switch>
    </Router>
  );
}
