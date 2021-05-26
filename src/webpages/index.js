import React from 'react';
import {
    BrowserRouter as Router,
    // Switch,
    Route,
    // Link
} from "react-router-dom";

import Home from './home/home';

const Webpages = () => {
    return(
        <Router>
            <Route exact path="/" component= {Home} />
        </Router>
    );
};

export default Webpages;