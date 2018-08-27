import React, { Component } from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import {Color} from "./components/color";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  state = {
     colors: []
  };

    handleKeyPress = (event) => {
        console.log(event)
        if(event.key === 'Enter'){
            console.log('enter press here! ')
        }
    };

    getRandomColor = (locked, color) => {
        if (locked) {
            return color;
        }
        const letters = '0123456789ABCDEF';
        let newColor = '#';
        for (let i = 0; i < 6; i++) {
            newColor += letters[Math.floor(Math.random() * 16)];
        }
        return newColor;
    };

    generateNewPalette = () => {
        let colors = []
        for (let i=1; i<=5; i++) {
            colors.push({color: this.getRandomColor(), locked: false});
            this.setState({colors});
        }
    };

    componentDidMount() {
        console.log(this.props.match)
        this.generateNewPalette();
    }

    render() {

    const {colors} = this.state;

    return (

      <div className="App" onKeyPress={this.handleKeyPress}>
        <header className="App-header">
            <input type="text" onKeyPress={(e) => console.log(e.target.which)}/>
            <Router>
                <Link to={"/app/"+[0,1,2,3,4].map(number => this.getRandomColor()).join("-").replace("#","")}>
                    <button className="btn btn-success mb-3">
                        New
                    </button>
                </Link>
            </Router>
          <h1 className="App-title">Randour</h1>
          <h6>Random color generator written in React</h6>
        </header>
          <Router>
              <div className="row">
                  {colors.map((color, index) => (
                      <Color background={color.color} key={color.color + index} />
                  ))}
              </div>
          </Router>

      </div>
    );
  }
}

export default App;
