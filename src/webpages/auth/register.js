import React from 'react';

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
              <label>
              Phone:
              <input
                name="phone"
                type="text" 
                value={this.state.phone} 
                onChange={this.handleInputChange} />
              </label>
            </p>
            <p>
              <label>
              Invite Code:
              <input
                name="inviteCode"
                type="text" 
                value={this.state.inviteCode} 
                onChange={this.handleInputChange} />
              </label>
            </p>
            {/* Insert Date Picker */}
            <p>
              <label>
              Password:
              <input
                name="password"
                type="password" 
                value={this.state.password} 
                onChange={this.handleInputChange} />
              </label>
            </p>
          <input type="submit" value="Submit" />
          </form>
        </div>
        );
      }
    }
    
    export default Register;