import React, { useState } from "react";
import PropTypes from "prop-types";
import CarouselCard from "./CarouselCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ChalangesCarousel = ({ chalanges, arrayLength }) => {
  const [index, setIndex] = useState(0);

  const goNext = () => {
    index < arrayLength - 1 ? setIndex((prevIdx) => prevIdx + 1) : setIndex(0);
  };

  const goPrev = () => {
    index > 0 ? setIndex((prevIdx) => prevIdx - 1) : setIndex(arrayLength - 1);
  };

  return (
    <div className="flex-1">
      <div className="flex md:flex-col space-x-fluid-m space-y-fluid-m">
        <div className="flex-1 md:flex-none relative">
          <div className="flex overflow-hidden w-fluid-img mx-auto">
            {chalanges?.map((chalange, idx) => (
              <CarouselCard key={idx} img={chalange?.img} index={index} />
            ))}
          </div>
          <div className="text-fluid text-final">
            <button
              onClick={goPrev}
              className="absolute top-1/2 -translate-y-1/2 cursor-pointer p-fluid-xs rounded-full bg-prime/50 hover:bg-prime/100"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={goNext}
              className="absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer p-fluid-xs rounded-full bg-prime/50 hover:bg-prime/100"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="flex-1">
          <article className="text-fluid-xs">
            {chalanges[index]?.chalange}
          </article>
        </div>
      </div>
    </div>
  );
};

ChalangesCarousel.propTypes = {
  chalanges: PropTypes.array,
  arrayLength: PropTypes.number,
};

export default ChalangesCarousel;
