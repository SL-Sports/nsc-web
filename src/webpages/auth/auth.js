import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
} from "react-router-dom";
import Button from '@material-ui/core/Button';

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
                                <Link to="/login" style={{ textDecoration: 'none' }}>
                                <Button variant="contained" color="primary">
                                    Login
                                </Button>
                                </Link>
                            </p>

                            <p>
                            <Link to="/register" style={{ textDecoration: 'none' }}>
                              <Button variant="contained" color="primary">
                                Register
                              </Button>
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