import React, { useState } from "react";
import SkillsCard from "./SkillsCard";
import getProtfolioImg from "../../../API/GET/getProtfolioImg";
import Loading from "../../shared/Loading/Loading";

const ProjectSkills = () => {
  const [numOfSkills, setNumOfSkills] = useState(5);
  const [portfolio, isLoading] = getProtfolioImg();

  if (isLoading) return <Loading />;

  const techObj = portfolio?.technologies?.flatMap((skill) =>
    Object.values(skill).flat()
  );

  const justTech = techObj?.filter?.((tech) => typeof tech !== "string");

  const handelShowAll = () => {
    setNumOfSkills(justTech?.length);
  };

  return (
    <div className="order-1 md:order-2">
      <fieldset className="border-2 border-prime p-fluid rounded-md relative">
        <legend className="px-fluid text-fluid text-wrap font-semibold">
          Skills Used In This Project
        </legend>
        <div className="space-y-fluid-m">
          {justTech?.slice(0, numOfSkills)?.map((tech, idx) => (
            <SkillsCard
              key={idx}
              logo={tech?.logo}
              name={tech?.name}
              level={null}
            />
          ))}
        </div>
        {numOfSkills !== justTech?.length && (
          <button
            onClick={handelShowAll}
            className="btn-third absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2"
          >
            Show All
          </button>
        )}
      </fieldset>
    </div>
  );
};

export default ProjectSkills;
