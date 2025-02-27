import React from "react";
import PropTypes from "prop-types";

const CarouselCard = ({ img, index }) => {
  return (
    <img
      src={img}
      alt="chalange1"
      style={{
        transform: `translateX(-${index * 100}%)`,
      }}
      className="w-full h-full"
    />
  );
};

CarouselCard.propTypes = {
  img: PropTypes.string,
  index: PropTypes.number,
};

export default CarouselCard;
