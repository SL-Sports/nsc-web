import React from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Box } from '@material-ui/core';

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
        phone: '',
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
        axios.post("http://128.199.196.251:3000/auth/login", 
                    this.state,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
            .then(res => {
                if (res.status === 200) {
                    this.props.setToken(res.data.token);
                } else {
                    alert(res.data.message);
                }
            }).catch(err => {
                console.log("caught");
                alert(err.response.data.message);
            })
        event.preventDefault();
    }

    render() {
        return (
        <div className='register-form'>
            <form onSubmit={this.handleSubmit}>
            <Grid container direction="column">
                <Grid item>
                    <TextField
                    name="phone"
                    type="text" 
                    label="Phone"
                    value={this.state.phone} 
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