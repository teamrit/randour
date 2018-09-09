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
    console.log(index);
    this.setState({colors: []});
    let newColors = [];
    let newColor = this.state.colors[index];
    newColors = R.update(index, newColor, newColors);
    this.setState({colors: newColors});
  };

  generateNew() {
    let colors = [];
    for (let i = 1; i <= 5; i++) {
      colors.push({ color: this.getRandomColor(), locked: false });
      this.setState({ colors });
    }
    const { history } = this.props;
    history.push(
      "/app/" + colors.map(color => color.color.replace("#", "")).join("-")
    );
  }

  componentDidMount() {
    const { colors } = this.state;
    for (let i = 1; i <= 5; i++) {
      colors.push({ color: this.getRandomColor(), locked: false });
      this.setState({ colors });
    }
    const { history } = this.props;
    history.push(
      "/app/" + colors.map(color => color.color.replace("#", "")).join("-")
    );
  }

  render() {
    console.log(this.props.match.params);

    const {
      state: { colors }
    } = this;
    return (
      <Fragment>
        <header className="App-header">
          <button
            onClick={() => {
              this.palette.current.focus();
            }}
          >
            Hey
          </button>
          <input
            value=""
            type="text"
            onKeyPress={e => this.generateNew()}
            ref={this.palette}
          />
          <h1 className="App-title">
            {"Randour".split("").map((char, index) => {
              let color = this.getRandomColor();
              return (
                <span className="mono" style={{ color: color }} key={index}>
                  {char}
                </span>
              );
            })}
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
