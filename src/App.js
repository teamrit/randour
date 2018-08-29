import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route,Switch} from 'react-router';
import Main from './components/main';
import PropTypes from 'prop-types';
import App2 from './components/reorder';

const Home = (<div>Home</div>);

class App extends Component {

    state = {};

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/app" component={Main} />
                    <Route path="/app2" component={App2} />
                </Switch>
            </Router>
        );
    }
}

export default App;
