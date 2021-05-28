import React from 'react';

class Logout extends React.Component {
    render() {
        return (
            <div className='logout-button'>
                <button onClick={this.props.onClick}>
                    Logout
                </button>
            </div>
        )
    }
}

export default Logout;