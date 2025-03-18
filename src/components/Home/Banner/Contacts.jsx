import React from "react";
import { Link } from "react-router";
import { FaLinkedin } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { IoMail } from "react-icons/io5";

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
          <span className="font-bold">Md. Ranit Rubbyat Sultan</span>
        </p>
        <p className="flex justify-items-start items-center gap-fluid-xs">
          <IoIosCall className="font-bold" />
          <span>+8801831495895</span>
        </p>
        <p className="flex flex-wrap justify-items-start items-center gap-fluid-xs">
          <IoMail className="font-bold" />
          <span>mdranitrubbyatsultan@gmail.com</span>
        </p>
        <p className="flex flex-wrap justify-items-start items-center gap-fluid-xs">
          <FaLinkedin className="font-bold" />
          <span>
            <Link
              to={"https://www.linkedin.com/in/ranit-rubbyat-sultan-khan/"}
              target="_blank"
              className="links line-clamp-1"
            >
              linkedin.com/in/ranit-rubbyat-sultan-khan
            </Link>
          </span>
        </p>
        <div className="mt-fluid-m">
          <Link to={"/about"}>
            <button className="btn-prime">Learn More</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
