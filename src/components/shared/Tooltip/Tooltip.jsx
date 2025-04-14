import React from "react";
import PropTypes from "prop-types";

const Tooltip = ({ children, tip }) => {
  return (
    <div className="relative group">
      {children}
      <span className="tooltip">{tip}</span>
    </div>
  );
};

Tooltip.propTypes = {
  tip: PropTypes.string,
};

export default Tooltip;
