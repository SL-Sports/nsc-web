import React from 'react';
import { Box, Button, Grid, TextField } from '@material-ui/core';
// eslint-disable-next-line
import { sizing, palette } from '@material-ui/system';

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
      alert('Registered Account: ' + this.state.phone + ' ' + this.state.inviteCode + ' ' + this.state.dateOfBirth);
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
                  name="phone"
                  type="text" 
                  label="Phone"
                  value={this.state.phone} 
                  onChange={this.handleInputChange}
                  required />
              </Grid>
              <Grid item>
                <TextField
                  name="inviteCode"
                  type="text" 
                  label="Invite Code"
                  value={this.state.inviteCode} 
                  onChange={this.handleInputChange}
                  required />
              </Grid>
              <Grid item>
                <Box
                  mt={2}>
                <TextField
                  name="dateOfBirth"
                  type="date"
                  label="Date of Birth"
                  value={this.state.dateOfBirth}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={this.handleInputChange}
                  required />
                  </Box>
              </Grid>
              <Grid item>
                <TextField
                  name="password"
                  type="password" 
                  label="Password"
                  value={this.state.password} 
                  onChange={this.handleInputChange}
                  required />
              </Grid>
              <Grid item>
                <Box my={2}>
                  <Button type="submit" variant="contained">
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
    
    export default Register;