import React from 'react';
import Button from '@material-ui/core/Button';

class Logout extends React.Component {
    render() {
        return (
            <div className='logout-button'>
                <Button 
                  onClick={this.props.onClick}
                  variant="contained"
                  color="primary">
                    Logout
                </Button>
            </div>
        )
    }
}

export default Logout;