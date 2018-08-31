import React, { Component, Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch, Link } from "react-router";
import Main from "./main";
import PropTypes from "prop-types";
import App2 from "./reorder";
import Spring from "./spring";

const Home = <div>Home</div>;

class App extends Component {
  state = {};

  render() {
    return (
      <Fragment>
        <a href="/app" className="btn btn-success mp-3">
          Palette Generator
        </a>
        <Router>
          <Switch>
            <Route path="/app" component={Main} />
            <Route path="/app2" component={App2} />
            <Route path="/spring" component={Spring} />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

export default App;
