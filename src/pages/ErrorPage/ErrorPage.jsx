import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <section className="font-roboto bg-final text-prime">
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-fluid-l text-third">404</p>
        <p className="text-fluid-m">page not found!</p>
        <span className="text-fluid">
          <Link to={"/"} className="links">
            &larr; Back To Home
          </Link>
        </span>
      </div>
    </section>
  );
};

export default ErrorPage;
