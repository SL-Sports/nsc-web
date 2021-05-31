import { TextField, Button, Grid, Box } from '@material-ui/core';
import React from 'react';

class Login extends React.Component {
    render() {
        return (
            <div className="login-form">
                <h1>
                    Login
                </h1>
                <LoginForm setToken={this.props.setToken} />
            </div>
        );
    }
}
    
class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        username: '',
        password: '',
        };
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
        [name]: value
        });
    }

    handleSubmit(event) {
        this.props.setToken("set");
        event.preventDefault();
    }

    render() {
        return (
        <div className='register-form'>
            <form onSubmit={this.handleSubmit}>
            <Grid container direction="column">
                <Grid item>
                    <TextField
                    name="username"
                    type="text" 
                    label="Username"
                    value={this.state.username} 
                    onChange={this.handleInputChange} />
                </Grid>
                <Grid item>
                    <TextField
                    name="password"
                    type="password" 
                    label="Password"
                    value={this.state.password} 
                    onChange={this.handleInputChange} />
                </Grid>
                <Grid item>
                    <Box my={2}>
                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                    </Box>
                </Grid>
            </Grid>
            </form>
        </div>
        );
    }
}

export default Login;