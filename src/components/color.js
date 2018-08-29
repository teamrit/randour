import React from 'react';
import {Spring} from 'react-spring';
import {TimingAnimation} from 'react-spring/dist/addons';

export const Color = (props) => {
    const {background} = props;
    return (
            <Spring
                from={{ background: "#ddd", transform: 'rotateZ(0deg)'}}
                to={{ background: background , transform: 'rotateZ(10deg)'}}
                impl={TimingAnimation}
                config={{duration: 500}}
            >
                {styles =>
                    <div className="cl" style={styles}>
                        <h3 className="bg-dark text-white"> <span>{background}</span></h3>
                        <i className="fas fa-3x fa-shadow fa-lock-open text-white" />
                    </div>
                }
            </Spring>
    )
};