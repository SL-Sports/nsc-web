import React from 'react';

class Login extends React.Component {
    render() {
        return (
            <div className="login-form">
                <p>
                    <button onClick ={() => this.props.setToken("set")}>
                        Login
                    </button>
                </p>
            </div>
        );
    }
}
    
export default Login;