import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaRegCircle } from "react-icons/fa";

const About = () => {
  const [adminData, setAdminData] = useState({});

  const getAdminData = async () => {
    const req = await fetch("./public/db/adminData.json");
    const res = await req.json();
    setAdminData(res);
  };

  useEffect(() => {
    getAdminData();
  }, []);

  console.log(adminData);

  return (
    <section className="my-fluid-m space-y-fluid-m relative">
      <div className="flex flex-col justify-center items-center">
        <p className="text-fluid-m">{adminData?.profile?.name}</p>
        <p className="text-fluid">{adminData?.profile?.title}</p>
      </div>
      <div className="grid grid-cols-3 gap-fluid">
        {/* tech skills and language*/}
        <div></div>
        {/* profile and project */}
        <div className="col-span-2">
          <div className="flex items-start gap-fluid-xs">
            <div className="space-y-fluid">
              <CgProfile className="text-fluid" />
              <div className="flex flex-col items-center h-full">
                {/* <hr className="grow" /> */}
                <div className="border-2"></div>
                <FaRegCircle className="text-fluid-xs" />
                <div className="border-2 flex-1"></div>
              </div>
            </div>
            <article>
              <p className="text-fluid font-medium">Profile</p>
              <p className="text-fluid-xs">{adminData?.profile?.description}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
