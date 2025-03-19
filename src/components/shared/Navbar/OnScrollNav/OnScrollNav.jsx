import React from "react";
import PropTypes from "prop-types";

const OnScrollNav = ({ showFixedNav }) => {
  return (
    <nav
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl text-center text-fluid font-medium  bg-final p-fluid transition-transform duration-500 z-50 ${
        showFixedNav ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      Portfolio
    </nav>
  );
};

OnScrollNav.propTypes = {
  showFixedNav: PropTypes.bool,
};

export default OnScrollNav;
