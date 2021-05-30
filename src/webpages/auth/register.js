import React from 'react';
import { FormLabel, Input, Button } from '@material-ui/core';

class Register extends React.Component {
  render() {
    return (
      <div className="login-form">
      <h1>
      Register
      </h1>
      <RegisterForm setToken={this.props.setToken} />
      </div>
      );
    }
  }
  
  class RegisterForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        phone: '',
        inviteCode: '',
        dateOfBirth: '',
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
      alert('Registered Account: ' + this.state.phone + ' ' + this.state.inviteCode);
      this.props.setToken("set");
      event.preventDefault();
    }
    
    render() {
      return (
        <div className='register-form'>
          <form onSubmit={this.handleSubmit}>
            <p>
              <FormLabel>
              Phone:
              </FormLabel>
              <Input
                name="phone"
                type="text" 
                value={this.state.phone} 
                onChange={this.handleInputChange} />
            </p>
            <p>
              <FormLabel>
              Invite Code:
              </FormLabel>
              <Input
                name="inviteCode"
                type="text" 
                value={this.state.inviteCode} 
                onChange={this.handleInputChange} />
            </p>
            {/* Insert Date Picker */}
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
          <Button type="submit" variant="contained">
            Submit
          </Button>
          </form>
        </div>
        );
      }
    }
    
    export default Register;