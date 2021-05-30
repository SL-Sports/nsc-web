import { FormLabel, Input, Button } from '@material-ui/core';
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
            <p>
                <FormLabel>
                Username:
                </FormLabel>
                <Input
                name="username"
                type="text" 
                value={this.state.username} 
                onChange={this.handleInputChange} />
            </p>
            <p>
                <FormLabel>
                Password:
                </FormLabel>
                <Input
                name="password"
                type="password" 
                value={this.state.password} 
                onChange={this.handleInputChange} />
            </p>
            <Button variant="contained" type="submit">
                Submit
            </Button>
            </form>
        </div>
        );
    }
}

export default Login;