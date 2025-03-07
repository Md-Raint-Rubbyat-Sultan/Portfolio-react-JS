import React, { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaRegCircle, FaLinkedin, FaGithub } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { IoLocation, IoMail } from "react-icons/io5";
import { PiBagSimpleLight } from "react-icons/pi";
import { LuGraduationCap } from "react-icons/lu";
import { Link } from "react-router";
import TechSkills from "../../components/shared/TechSkills/TechSkills";
import projectsDB from "/public/db/ProjectsDB.js";
import ProjectsCards from "../../components/shared/ProjectCards/ProjectsCards";
import toCapital from "../../Constants/toCapital";
import jsPDF from "jspdf";

const About = () => {
  const [adminData, setAdminData] = useState({});
  const resumeRef = useRef(); // Reference to the content div

  const getAdminData = async () => {
    const req = await fetch("./public/db/adminData.json");
    const res = await req.json();
    setAdminData(res);
  };

  useEffect(() => {
    getAdminData();
  }, []);

  // console.log(adminData);

  // pdf download
  const handleDownloadPDF = () => {
    const input = resumeRef.current;

    const pdf = new jsPDF("p", "mm", "a4");

    // Use the html method to add HTML content to the PDF
    pdf.html(input, {
      callback: function (pdf) {
        pdf.save("about.pdf");
      },
      x: 10,
      y: 10,
      width: 190, // A4 width in mm (210mm - 20mm margins)
      windowWidth: input.scrollWidth, // Use the width of the content
      html2canvas: {
        backgroundColor: "#eeeeee", // Prevents background issues
        useCORS: true, // Fixes cross-origin images
        // ignoreElements: (element) => {
        //   // Ignore elements that might have unsupported colors
        //   const styles = window.getComputedStyle(element);
        //   return (
        //     styles.color === "transparent" ||
        //     styles.color.includes("rgba(0, 0, 0, 0)")
        //   );
        // },
      },
    });
  };

  return (
    <section className="my-fluid-m space-y-fluid relative">
      <div className="text-right">
        <button onClick={handleDownloadPDF} className="btn-prime">
          Download My Resume
        </button>
      </div>
      {/* mian resume */}
      <div ref={resumeRef} className="space-y-fluid-m bg-final text-prime">
        {/* intro */}
        <div className="flex flex-col justify-center items-center">
          <p className="text-fluid-m">{adminData?.profile?.name}</p>
          <p className="text-fluid">{adminData?.profile?.title}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-fluid">
          {/* tech skills and language*/}
          <div className="space-y-fluid-m">
            {/* contact */}
            <div className="space-y-fluid">
              <div>
                <h3 className="text-fluid font-medium">CONTACT</h3>
                <hr />
              </div>
              <div className="text-fluid-xs">
                <div className="flex items-center gap-fluid-xs">
                  <IoIosCall />
                  <span>{adminData?.contact?.phone}</span>
                </div>
                <div className="flex flex-wrap items-center gap-fluid-xs">
                  <IoMail />
                  <span>{adminData?.contact?.email}</span>
                </div>
                <div className="flex flex-wrap items-center gap-fluid-xs">
                  <IoLocation />
                  <span>{adminData?.contact?.location}</span>
                </div>
                <div className="flex items-center gap-fluid-xs">
                  <FaLinkedin className="min-w-fluid-xs min-h-fluid-xs" />
                  <span>
                    <Link
                      to={adminData?.contact?.linkedIn}
                      target="_blank"
                      className="links line-clamp-1"
                    >
                      {adminData?.contact?.linkedIn}
                    </Link>
                  </span>
                </div>
                <div className="flex items-center gap-fluid-xs">
                  <FaGithub className="min-w-fluid-xs min-h-fluid-xs" />
                  <span>
                    <Link
                      to={adminData?.contact?.gitHub}
                      target="_blank"
                      className="links line-clamp-1"
                    >
                      {adminData?.contact?.gitHub}
                    </Link>
                  </span>
                </div>
              </div>
            </div>
            {/* tech */}
            <div className="space-y-fluid">
              <div>
                <h3 className="text-fluid font-medium">TECHNICAL SKILLS</h3>
                <hr />
              </div>
              <div>
                <TechSkills
                  technologies={adminData?.technical_skills}
                  gridLg={false}
                />
              </div>
            </div>
            {/* language */}
            <div className="space-y-fluid">
              <div>
                <h3 className="text-fluid font-medium">LANGUAGE</h3>
                <hr />
              </div>
              <div>
                <ul className="text-fluid-xs pl-fluid list-disc space-y-fluid-xs">
                  {adminData?.language_skills?.map((lang, idx) => (
                    <li key={idx}>
                      {lang?.name} - {`(${toCapital(lang?.level)})`}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* profile and project */}
          <div className="col-span-1 sm:col-span-2 space-y-fluid-m">
            {/* profile */}
            <div className="flex items-start gap-fluid-xs">
              <div>
                <CgProfile className="text-fluid" />
              </div>
              <article>
                <h3 className="text-fluid font-medium">PROFILE</h3>
                <div className="border-l border-t border-prime relative">
                  <FaRegCircle className="text-fluid-xs bg-final rounded-full absolute top-1/2 -translate-y-1/2 -translate-x-1/2" />
                  <p className="text-fluid-xs pl-fluid pt-fluid">
                    {adminData?.profile?.description}
                  </p>
                </div>
              </article>
            </div>
            {/* Eucation */}
            <div className="flex items-start gap-fluid-xs">
              <div>
                <LuGraduationCap className="text-fluid" />
              </div>
              <div>
                <h3 className="text-fluid font-medium">EDUCATION</h3>
                <div className="border-l border-t border-prime relative">
                  <FaRegCircle className="text-fluid-xs bg-final rounded-full absolute top-1/2 -translate-y-1/2 -translate-x-1/2" />
                  <div className="text-fluid-xs pl-fluid pt-fluid">
                    <article>
                      {adminData?.education?.map((edu, idx) => (
                        <div key={idx}>
                          <p className="font-medium">{edu?.degree}</p>
                          <p>{edu?.institution}</p>
                          <p>{edu?.location}</p>
                          <p>{edu?.year}</p>
                        </div>
                      ))}
                    </article>
                  </div>
                </div>
              </div>
            </div>
            {/* projects */}
            <div>
              <div className="flex items-start gap-fluid-xs">
                <div>
                  <PiBagSimpleLight className="text-fluid" />
                </div>
                <div>
                  <h3 className="text-fluid font-medium">PROJECTS</h3>
                  <div className="border-l border-t border-prime relative">
                    <FaRegCircle className="text-fluid-xs bg-final rounded-full absolute top-1/2 -translate-y-1/2 -translate-x-1/2" />
                    <div className="pl-fluid pt-fluid">
                      {projectsDB?.map((project, idx) => (
                        <ProjectsCards
                          key={idx}
                          id={project?.id}
                          name={project?.name}
                          clintSite={project?.clintSite}
                          serverSite={project?.serverSite}
                          technologies={project?.technologies}
                          description={project?.description}
                          isTrue={false}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
