import React from 'react';
import COLORS from '../../colors';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

import Activities from '../activities';
import Profiles from '../profiles';
import Payments from '../payments';
import PaymentDetail from '../payments/paymentDetail';
import NewPayment from '../payments/newPayment';
import EditPayment from '../payments/editPayment';

function Home () {
    return <h1  style={{color: COLORS.blueGradientStart}}>Home</h1>
}

function NoMatch () {
    return <h1>404 Page Not Found</h1>
}

export default function Routes () {
    return (
        <Router>
            <Switch>
                {/* TODO: Auth */}
                {/* Activities */}
                <Route path='/activities' component={Activities} />
                {/* Payments */}
                <Route path='/payments' component={Payments} />
                <Route path='/payment-detail/:paymentID' component={PaymentDetail} />
                <Route path='/payments-new' component={NewPayment} />
                <Route path='/payments-edit/:paymentID' component={EditPayment} />
                {/* Profiles */}
                <Route path='/profiles' component={Profiles} />
                {/* Home */}
                <Route exact path='/' component={Home} />
                {/* NoMatch */}
                <Route path='*' component={NoMatch} />
            </Switch>
        </Router>
    )
}