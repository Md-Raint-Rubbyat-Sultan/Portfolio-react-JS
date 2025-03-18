import React, { useState, useEffect, useCallback } from "react";
import { IoMdRocket } from "react-icons/io";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  //   handel scroll to top
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY; // Current scroll position
    const pageHeight =
      document.documentElement.scrollHeight - window.innerHeight; // Total scrollable height
    const scrollPercentage = (scrollTop / pageHeight) * 100; // Scroll percentage

    // Show button when user has scrolled 20% of the page
    setShowButton(scrollPercentage >= 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll to top
    });
  };

  return (
    <>
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-third text-white p-fluid rounded-full shadow-lg hover:bg-second transition-colors duration-300 cursor-pointer z-40"
        >
          <IoMdRocket />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
