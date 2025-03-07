import React from "react";
import PropTypes from "prop-types";
import toCapital from "../../../Constants/toCapital";

const TechSkills = ({ technologies, gridLg }) => {
  // get the type of the tech
  const techType = technologies?.map((tech) => Object.keys(tech));

  return (
    <div className="space-y-fluid-xs">
      {technologies?.map(
        (tech, idx) =>
          tech?.[`${techType[idx]}`].length > 0 && (
            <div key={idx}>
              <h3 className="text-fluid-xs font-medium">
                {toCapital(...techType[idx])}:
              </h3>
              <ul
                className={`grid grid-cols-2 lg:grid-cols-${gridLg} text-fluid-xs pl-fluid list-disc space-y-fluid-xs`}
              >
                {tech?.[`${techType[idx]}`].map((techName, idx) => (
                  <li key={idx}>
                    {techName?.name}{" "}
                    {techName?.level && `(${toCapital(techName?.level)})`}
                  </li>
                ))}
              </ul>
            </div>
          )
      )}
    </div>
  );
};

TechSkills.propTypes = {
  technologies: PropTypes.array,
};

export default TechSkills;
