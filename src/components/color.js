import React from "react";
import { Spring } from "react-spring";
import { TimingAnimation } from "react-spring/dist/addons";

export const Color = props => {
  const { background, clickHandler, index, isLocked } = props;
  return (
    <Spring
      from={{ background: "#ddd" }}
      to={{ background: background }}
      impl={TimingAnimation}
      config={{ duration: 150 }}
    >
      {styles => (
        <div className="cl" style={styles}>
          <h3 className="bg-dark text-white">
            {" "}
            <span>{background}</span>
          </h3>
          <i
            className={`fas fa-3x fa-shadow text-white ${!isLocked ? "fa-lock-open" : "fa-lock"}`}
            id="lock"
            onClick={clickHandler(index)}
          />
        </div>
      )}
    </Spring>
  );
};
