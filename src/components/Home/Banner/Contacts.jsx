import React from "react";
import { Link } from "react-router";

const Contacts = () => {
  return (
    <div className="flex-1">
      <div className="borde-2 h-1/3 hidden md:block relative">
        <p className="absolute top-2 left-2 text-fluid-m font-semibold">
          Portfolio
        </p>
        <div className="border-2 -rotate-12 origin-right"></div>
      </div>
      <div className="p-fluid-m text-fluid">
        <p>
          <span className="font-bold">Name: </span>
          <span>Md. Ranit Rubbyat Sultan</span>
        </p>
        <p>
          <span className="font-bold">Contact: </span>
          <span>+8801831495895</span>
        </p>
        <p>
          <span className="font-bold">Email: </span>
          <span>mdranitrubbyatsultan@gmail.com</span>
        </p>
        <p className="line-clamp-1">
          <span className="font-bold">LinkedIN: </span>
          <span>
            <Link
              to={"https://www.linkedin.com/in/ranit-rubbyat-sultan-khan/"}
              target="_blank"
              className="underline text-third"
            >
              linkedin.com/in/ranit-rubbyat-sultan-khan
            </Link>
          </span>
        </p>
        <div className="mt-fluid-m">
          <Link to={"/about"}>
            <button className="btn-prime">Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
