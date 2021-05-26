import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
} from "react-router-dom";

import Login from './login'
import Register from './register'

class Auth extends React.Component {

    render() {
        return (
            <Router basename="/auth">
                <Switch>
                    <Route path="/login">
                        <Login setToken={this.props.setToken} />
                    </Route>
                    <Route path="/register">
                        <Register setToken={this.props.setToken} />
                    </Route>
                    <Route path="/">
                        <div>
                            <p>
                                <Link to="/login">
                                    Login
                                </Link>
                            </p>

                            <p>
                                <Link to="/register">
                                    Register
                                </Link>
                            </p>
                        </div>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default Auth;