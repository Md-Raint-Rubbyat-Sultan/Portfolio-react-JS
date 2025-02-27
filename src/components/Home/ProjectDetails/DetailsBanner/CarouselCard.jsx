import React from "react";
import PropTypes from "prop-types";

const CarouselCard = ({ img }) => {
  return (
    <div>
      <img
        src={img}
        alt="chalange1"
        className="w-fluid-img h-[60vw] md:h-[40vw] xl:h-[30vw] md:mx-auto"
      />
    </div>
  );
};

CarouselCard.propTypes = {
  img: PropTypes.string,
};

export default CarouselCard;
