import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center text-fluid-m relative">
      <div className="absolute w-fluid-xl h-fluid-xl rounded-full border-2 border-third animate-ping"></div>
      <p>Loading</p>
    </div>
  );
};

export default Loading;
