import React from 'react';
import axios from 'axios';

const headers = {
    'Content-Type': 'application/json'
}

class Home extends React.Component {
    state = {
        profiles: []
    };

    componentDidMount() {
        axios.post("http://128.199.196.251:3000/profile/get", 
                    {},
                    {
                        headers: headers
                    }
                    )
          .then(res => {
              const profiles = res.data;
              this.setState({ profiles });
          });
    }

    render() {
        return (
            <div>
                <h1>SL Sports</h1>
                <p>This is home page</p>
                <ul>
                    { this.state.profiles.map(
                        profile => 
                            <li key={profile.profile._id}>{profile.profile.preferredName}</li>
                            )}
                </ul>
            </div>
        );
    }
};

export default Home;