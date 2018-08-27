import React from 'react';
import {Color} from './color';

export class Palette extends React.Component {

    state = {
        colors: []
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

    componentDidMount() {
        const {colors} = this.state;
        for (let i=1; i<=5; i++) {
            colors.push({color: this.getRandomColor(), locked: false});
            this.setState({colors});
        }
    }

    render() {
        const {state: {colors}} = this;
        return (
            <div className="row">
                {colors.map((color, index) => (
                    <Color background={color.color} key={color.color + index} />
                ))}
            </div>
        );
    }
}