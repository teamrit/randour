import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import {Color} from "./color";
import {Palette} from "./palette";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

class Main extends Component {
    render() {
    return (

      <div className="App">
        <Switch>
            <Route to="/app/:colors/" component={Palette}/>
        </Switch>
      </div>
    );
  }
}

export default Main;
