import React, { useEffect, useState } from "react";
import SkillsCard from "./SkillsCard";
import getAdminTech from "../../../API/GET/getAdminTech";
import Loading from "../../shared/Loading/Loading";

const MySkills = () => {
  const [numOfSkills, setNumOfSkills] = useState(5);
  const [adminData, isLoading] = getAdminTech();

  const techObj = adminData?.technical_skills?.flatMap((skill) =>
    Object?.values(skill)?.flat()
  );
  const justTech = techObj?.filter?.((tech) => typeof tech !== "string");

  const handelShowAll = () => {
    setNumOfSkills(justTech?.length);
  };

  return (
    <div className="order-2 md:order-1">
      <fieldset className="border-2 border-prime p-fluid rounded-md relative">
        <legend className="px-fluid text-fluid font-semibold">Skills</legend>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="space-y-fluid-m">
            {justTech?.slice(0, numOfSkills)?.map((tech, idx) => (
              <SkillsCard
                key={idx}
                logo={tech?.logo}
                name={tech?.name}
                level={tech?.level}
              />
            ))}
          </div>
        )}
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

export default MySkills;
