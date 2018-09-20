import React, { Fragment } from "react";
import { Color } from "./color";
import * as R from 'ramda';

export class Palette extends React.Component {
  constructor(props) {
    super(props);
    this.palette = React.createRef();
  }

  state = {
    colors: []
  };

  getRandomColor = (locked, color) => {
    if (locked) {
      return color;
    }
    const letters = "0123456789ABCDEF";
    let newColor = "#";
    for (let i = 0; i < 6; i++) {
      newColor += letters[Math.floor(Math.random() * 16)];
    }
    return newColor;
  };

  toggleLock = index => e => {
    let newColors = this.state.colors;
    let newColor = this.state.colors[index];
    const {color, locked} = newColor;
    newColor = {color, locked: !locked };
    newColors = R.update(index, newColor, newColors);
    this.setState({colors: newColors});
  };

  generateNew = () => {
    let colors = this.state.colors;
    let newColors = [];
    for (let i=0; i<5; i++) {
        if (colors[i] && colors[i].locked === true)
            newColors.push(colors[i]);
        else
            newColors.push({color: this.getRandomColor(), locked: false});
    }
    this.setState({colors: newColors});
    const { history } = this.props;
    history.push(
      "/app/" + newColors.map(color => color.color.replace("#", "")).join("-")
    );
  };

  componentDidMount() {
    let generateNew = this.generateNew.bind(this);
    window.addEventListener("keydown", function onPress(event) {
      if (event.keyCode === 32) {
        generateNew();
      }
    });
    this.generateNew();
  }

  render() {
    const {
      state: { colors }
    } = this;
    return (
      <Fragment>
        <header className="App-header">
          <h1 className="App-title" style={{color: "yellow"}}>
            Randour
          </h1>
          <h6>Random color generator written in React</h6>
        </header>
        <div className="row">
          {colors.map((color, index) => (
            <Color
              background={color.color}
              key={color.color + index}
              index={index}
              isLocked={color.locked}
              clickHandler={this.toggleLock}
            />
          ))}
        </div>
      </Fragment>
    );
  }
}
