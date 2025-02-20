import React from "react";
import { Link } from "react-router";

const ProjectsCards = () => {
  return (
    <fieldset className="border-2 border-prime p-fluid rounded-md relative">
      <legend className="px-fluid text-fluid font-semibold">Portfolio</legend>
      <div className="space-y-fluid">
        <div className="space-y-fluid-xs">
          <h3 className="text-fluid font-medium">Clint Site</h3>
          <div className="md:flex md:items-center md:gap-fluid-xs">
            <span className="text-fluid-xs font-medium">Site:</span>
            <Link
              to={`http://localhost:5173/`}
              target="_blank"
              className="text-fluid-xs hover:text-third hover:underline line-clamp-1"
            >
              http://localhost:5173/
            </Link>
          </div>
          <div className="md:flex md:items-center md:gap-fluid-xs">
            <span className="text-fluid-xs font-medium">Git Link:</span>
            <Link
              to={`https://github.com/Md-Raint-Rubbyat-Sultan/Portfolio-react-JS`}
              target="_blank"
              className="text-fluid-xs hover:text-third hover:underline line-clamp-1"
            >
              https://github.com/Md-Raint-Rubbyat-Sultan/Portfolio-react-JS
            </Link>
          </div>
        </div>
        <div>
          <h3 className="text-fluid font-medium">Technologies</h3>
          <ul className="flex flex-wrap items-center gap-fluid-m text-fluid-xs pl-fluid list-disc">
            <li>node</li>
            <li>node</li>
            <li>node</li>
            <li>node</li>
            <li>node...</li>
          </ul>
        </div>
        <div>
          <h3 className="text-fluid font-medium">Decriptions</h3>
          <article className="line-clamp-2 text-fluid-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit sequi
            esse vitae omnis excepturi minus veritatis officiis laudantium
            deleniti nobis, hic nesciunt beatae, facilis quasi explicabo neque a
            praesentium perspiciatis!
          </article>
        </div>
        <div className="text-right">
          <button className="btn-second">More Details</button>
        </div>
      </div>
    </fieldset>
  );
};

export default ProjectsCards;
