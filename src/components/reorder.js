// Forked from: https://github.com/chenglou/react-motion/tree/master/demos/demo8-draggable-list
// Original: http://framerjs.com/examples/preview/#list-sorting.framer

import React from 'react'
import ReactDOM from 'react-dom'
import { Spring } from 'react-spring'
import { Gesture } from 'react-with-gesture'
import range from 'lodash/range'
import './styles.css'

const clamp = (n, min, max) => Math.max(Math.min(n, max), min)
const itemsCount = 4
function reinsert(arr, from, to) {
    const _arr = arr.slice(0)
    const val = _arr[from]
    _arr.splice(from, 1)
    _arr.splice(to, 0, val)
    return _arr
}

class App extends React.Component {
    state = { mouseY: 0, topDeltaY: 0, isPressed: false, originalPosOfLastPressed: 0, order: range(itemsCount) }

    componentDidMount() {
        window.addEventListener('touchmove', this.handleTouchMove)
        window.addEventListener('touchend', this.handleMouseUp)
        window.addEventListener('mousemove', this.handleMouseMove)
        window.addEventListener('mouseup', this.handleMouseUp)
    }

    handleTouchStart = (key, pressLocation, e) => this.handleMouseDown(key, pressLocation, e.touches[0])
    handleTouchMove = e => e.preventDefault() || this.handleMouseMove(e.touches[0])
    handleMouseUp = () => this.setState({ isPressed: false, topDeltaY: 0 })
    handleMouseDown = (pos, pressY, { pageY }) =>
        this.setState({ topDeltaY: pageY - pressY, mouseY: pressY, isPressed: true, originalPosOfLastPressed: pos })
    handleMouseMove = ({ pageY }) => {
        const { isPressed, topDeltaY, order, originalPosOfLastPressed } = this.state
        if (isPressed) {
            const mouseY = pageY - topDeltaY
            const currentRow = clamp(Math.round(mouseY / 100), 0, itemsCount - 1)
            let newOrder = order
            if (currentRow !== order.indexOf(originalPosOfLastPressed))
                newOrder = reinsert(order, order.indexOf(originalPosOfLastPressed), currentRow)
            this.setState({ mouseY: mouseY, order: newOrder })
        }
    }

    render() {
        const { mouseY, isPressed, originalPosOfLastPressed, order } = this.state
        return (
            <div className="demo8">
                {range(itemsCount).map(i => {
                    const active = originalPosOfLastPressed === i && isPressed
                    const style = active
                        ? { scale: 1.1, shadow: 16, y: mouseY }
                        : { scale: 1, shadow: 1, y: order.indexOf(i) * 100 }
                    return (
                        <Spring immediate={name => active && name === 'y'} to={style} key={i}>
                            {({ scale, shadow, y }) => (
                                <div
                                    onMouseDown={this.handleMouseDown.bind(null, i, y)}
                                    onTouchStart={this.handleTouchStart.bind(null, i, y)}
                                    className="demo8-item"
                                    style={{
                                        boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
                                        transform: `translate3d(${y}px,0,  10px) scale(${scale})`,
                                        zIndex: i === originalPosOfLastPressed ? 99 : i
                                    }}>
                                    {order.indexOf(i) + 1}
                                </div>
                            )}
                        </Spring>
                    )
                })}
            </div>
        )
    }
}

export default App;