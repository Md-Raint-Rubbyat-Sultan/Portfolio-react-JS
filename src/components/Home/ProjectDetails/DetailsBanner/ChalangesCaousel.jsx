import React from "react";
import PropTypes from "prop-types";
import CarouselCard from "./CarouselCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ChalangesCarousel = ({ chalanges }) => {
  console.log(chalanges);
  return (
    <div className="flex-1">
      <div className="flex md:flex-col space-x-fluid-m space-y-fluid-m">
        <div className="flex-1 md:flex-none relative">
          {chalanges?.map((chalange, idx) => (
            <CarouselCard key={idx} img={chalange?.img} />
          ))}
          <div className="text-fluid text-prime/50">
            <span className="absolute top-1/2 -translate-y-1/2 hover:text-prime/100 cursor-pointer">
              <FaChevronLeft />
            </span>
            <span className="absolute top-1/2 right-0 -translate-y-1/2 hover:text-prime/100 cursor-pointer">
              <FaChevronRight />
            </span>
          </div>
        </div>

        <div className="flex-1">
          <article className="text-fluid-xs">{chalanges[0]?.chalange}</article>
        </div>
      </div>
    </div>
  );
};

ChalangesCarousel.propTypes = {
  chalanges: PropTypes.array,
};

export default ChalangesCarousel;
