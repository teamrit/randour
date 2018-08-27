import React from 'react';

export const Color = (props) => {
    const {background} = props;
    return (
        <div className="cl" style={{
            background: background ? background : "#333333"}}>
            <div className="row" style={{flexDirection: "column",justifyContent: "space-around"}}>
                <h3 className="bg-dark text-white"> <span>{background}</span></h3>
                <i className="fas fa-3x fa-shadow fa-lock-open text-white" />
            </div>
        </div>
    )
};