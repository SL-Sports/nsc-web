import React from 'react';

class Login extends React.Component {
    render() {
        return (
            <div className="login-form">
                <h1>
                    Login
                </h1>
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