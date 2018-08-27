import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route} from 'react-router';
import App from './App';
import PropTypes from 'prop-types';

const Home = (<div>Home</div>);

class Main extends Component {

    state = {};

    render() {
        return (
            <Router>
                <Route path="/app" component={App} />
            </Router>
        );
    }
}

export default Main;
