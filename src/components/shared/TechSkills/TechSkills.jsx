import React from "react";
import PropTypes from "prop-types";
import toCapital from "../../../Constants/toCapital";

const TechSkills = ({ technologies, gridLg }) => {
  // get the type of the tech
  const techType = technologies?.map((tech) => Object.keys(tech));

  return (
    <div className="space-y-fluid-xs">
      {technologies?.map(
        (techs, idx) =>
          techs?.tech?.length > 0 && (
            <div key={idx}>
              <h3 className="text-fluid-xs font-medium">
                {toCapital(techs?.category)}:
              </h3>
              <ul
                className={`grid grid-cols-2 ${
                  gridLg ? "lg:grid-cols-3" : ""
                } text-fluid-xs pl-fluid list-disc space-y-fluid-xs`}
              >
                {techs?.tech?.map((techName, idx) => (
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
  gridLg: PropTypes.bool,
};

export default TechSkills;
