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
import { Grid, Paper, Box } from '@material-ui/core';
// eslint-disable-next-line
import { sizing, palette } from '@material-ui/system';

class Auth extends React.Component {

    render() {
        return (
            <Box height={400}>
            <Router basename="/auth">
                <Switch>
                    <Route path="/login">
                        <Login setToken={this.props.setToken} />
                    </Route>
                    <Route path="/register">
                        <Register setToken={this.props.setToken} />
                    </Route>
                    <Route path="/">
                        <Box mt={10}>
                            <Grid 
                              container 
                              justify="center" 
                              align="center"
                              spacing={4}>
                                <Grid item xs />

                                <Grid item xs={5}>
                                    <Paper>
                                        <Box height={300} py={1} my={1}>
                                            <Box>
                                                <p>
                                                    Hey! If you have an account with us already, click here to login
                                                </p>
                                                <Link to="/login" style={{ textDecoration: 'none' }}>
                                                <Button variant="contained" color="primary">
                                                    Login
                                                </Button>
                                                </Link>
                                            </Box>
                                        </Box>
                                    </Paper>
                                </Grid>

                                <Grid item xs={5}>
                                    <Paper bgcolor="primary.main">
                                        <Box height={300} py={1} my={1}>
                                        <p>
                                            Hey! If you are an athlete who has been invited to the platform, click here to sign up!
                                        </p>
                                        <Link to="/register" style={{ textDecoration: 'none' }} >
                                        <Button variant="contained" color="primary">
                                            Register
                                        </Button>
                                        </Link>
                                        </Box>
                                    </Paper>
                                </Grid>

                                <Grid item xs />
                            </Grid>
                        </Box>
                    </Route>
                </Switch>
            </Router>
            </Box>
        );
    }
}

export default Auth;