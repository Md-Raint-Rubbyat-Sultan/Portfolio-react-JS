import React, { useEffect, useState } from "react";
import SkillsCard from "./SkillsCard";

const MySkills = () => {
  const [numOfSkills, setNumOfSkills] = useState(5);
  const [adminData, setAdminData] = useState({});

  const getAdminData = async () => {
    const req = await fetch("./public/db/adminData.json");
    const res = await req.json();
    setAdminData(res);
  };

  useEffect(() => {
    getAdminData();
  }, []);

  const techObj = adminData?.technical_skills?.flatMap((skill) =>
    Object.values(skill).flat()
  );

  const handelShowAll = () => {
    setNumOfSkills(techObj?.length);
  };

  return (
    <div className="order-2 md:order-1">
      <fieldset className="border-2 border-prime p-fluid rounded-md relative">
        <legend className="px-fluid text-fluid font-semibold">Skills</legend>
        {/* add skills */}
        <div className="space-y-fluid-m">
          {techObj?.slice(0, numOfSkills)?.map((tech, idx) => (
            <SkillsCard
              key={idx}
              logo={tech?.logo}
              name={tech?.name}
              level={tech?.level}
            />
          ))}
        </div>
        {numOfSkills !== techObj?.length && (
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
