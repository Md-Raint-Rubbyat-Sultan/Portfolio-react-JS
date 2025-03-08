import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaRegCircle, FaLinkedin, FaGithub } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { IoLocation, IoMail } from "react-icons/io5";
import { PiBagSimpleLight } from "react-icons/pi";
import { LuGraduationCap } from "react-icons/lu";
import { Link } from "react-router";
import TechSkills from "../../components/shared/TechSkills/TechSkills";
import ProjectsCards from "../../components/shared/ProjectCards/ProjectsCards";
import toCapital from "../../Constants/toCapital";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import projectsDB from "/public/db/ProjectsDB.js";

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

  // console.log(adminData);

  // pdf download
  const handleDownloadPDF = async () => {
    // Step 1: Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([595, 842]); // A4 size
    let yOffset = 800; // Starting Y position

    // Step 2: Define colors & fonts
    const textColor = rgb(0.11, 0.09, 0.09); // #1d1616
    const linkColor = rgb(0.85, 0.25, 0.25); // #d84040
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Step 3: Helper functions
    const addText = (
      text,
      x,
      y,
      size = 12,
      color = textColor,
      maxWidth = 500
    ) => {
      const lines = [];
      let currentLine = "";

      // Split text into words
      const words = text.split(" ");

      // Build lines that fit within maxWidth
      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const testWidth = font.widthOfTextAtSize(testLine, size);

        if (testWidth <= maxWidth) {
          currentLine = testLine;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      }

      // Add the last line
      if (currentLine) {
        lines.push(currentLine);
      }

      // Draw each line
      for (const line of lines) {
        page.drawText(line, {
          x,
          y,
          size,
          color,
          font,
        });
        y -= size + 2; // Move down for the next line
      }

      return y; // Return the updated yOffset
    };

    const addLink = (text, url, x, y, size = 12) => {
      // Draw the link text
      page.drawText(text, {
        x,
        y,
        size,
        color: linkColor,
        font,
      });

      // Create a clickable link annotation
      const textWidth = font.widthOfTextAtSize(text, size);
      const linkHeight = size; // Approximate text height

      const linkAnnotation = pdfDoc.context.obj({
        Type: "Annot",
        Subtype: "Link",
        Rect: [x, y - linkHeight, x + textWidth, y], // Annotation box
        Border: [0, 0, 0], // No border
        A: {
          Type: "Action",
          S: "URI",
          URI: url,
        },
      });

      // Add the annotation to the page
      if (!page.node.Annots) {
        page.node.set("Annots", pdfDoc.context.obj([]));
      }
      const annotsArray = page.node.lookup("Annots");
      annotsArray?.push(linkAnnotation);
    };

    const addSectionHeader = (text, y) => {
      addText(text, 50, y, 14, textColor);
      // Draw a horizontal line (hr)
      page.drawLine({
        start: { x: 50, y: y - 5 },
        end: { x: 545, y: y - 5 },
        thickness: 1,
        color: textColor,
      });
      return y - 30; // Move down for the next item
    };

    // Step 4: Add Admin info to the PDF
    const addAdminInfo = (y) => {
      y = addText(adminData?.profile?.name, 50, y);

      // Title
      y = addText(adminData?.profile?.title, 50, y);
      y -= 20;

      return y;
    };
    // Step 5: Add content to the PDF
    const addContactInfo = (y) => {
      y = addSectionHeader("CONTACT", y);

      // Phone
      y = addText(`Phone: ${adminData?.contact?.phone}`, 50, y);
      y -= 20;

      // Email
      y = addText(`Email: ${adminData?.contact?.email}`, 50, y);
      y -= 20;

      // Location
      y = addText(`Location: ${adminData?.contact?.location}`, 50, y);
      y -= 20;

      // LinkedIn
      addLink(
        `LinkedIn: ${adminData?.contact?.linkedIn}`,
        adminData?.contact?.linkedIn,
        50,
        y
      );
      y -= 20;

      // GitHub
      addLink(
        `GitHub: ${adminData?.contact?.gitHub}`,
        adminData?.contact?.gitHub,
        50,
        y
      );
      y -= 30; // Extra space after the section

      return y;
    };

    const addTechnicalSkills = (y) => {
      y = addSectionHeader("TECHNICAL SKILLS", y);

      // Check the structure of technologies

      adminData?.technical_skills?.forEach((category) => {
        const categoryName = Object.keys(category)[0]; // e.g., "frontend", "backend"
        const skills = category[categoryName]; // Array of skills

        // Add category name
        y = addText(`${toCapital(categoryName)}:`, 50, y, 12, textColor);
        y -= 10; // Space after category name

        // Add skills
        skills.forEach((skill) => {
          const skillText = skill.level
            ? `- ${skill.name} (${toCapital(skill.level)})`
            : `- ${skill.name}`;
          y = addText(skillText, 70, y); // Indent skills
          y -= 15; // Space after each skill
        });

        y -= 10; // Extra space after each category
      });

      return y;
    };

    const addLanguages = (y) => {
      y = addSectionHeader("LANGUAGE", y);

      adminData?.language_skills?.forEach((lang) => {
        y = addText(`- ${lang.name} (${toCapital(lang.level)})`, 50, y);
        y -= 15; // Space after each language
      });

      return y - 10; // Extra space after the section
    };

    const addProfile = (y) => {
      y = addSectionHeader("PROFILE", y);

      y = addText(adminData?.profile?.description, 50, y, 12, textColor, 500); // Wrap text
      y -= 30; // Adjust based on content height
      return y;
    };

    const addEducation = (y) => {
      y = addSectionHeader("EDUCATION", y);

      adminData?.education?.forEach((edu) => {
        y = addText(`Degree: ${edu.degree}`, 50, y);
        y -= 15;
        y = addText(`Institution: ${edu.institution}`, 50, y);
        y -= 15;
        y = addText(`Location: ${edu.location}`, 50, y);
        y -= 15;
        y = addText(`Year: ${edu.year}`, 50, y);
        y -= 20; // Extra space after each education entry
      });

      return y - 10; // Extra space after the section
    };

    const addProjects = (y) => {
      y = addSectionHeader("PROJECTS", y);

      projectsDB?.forEach((project) => {
        y = addText(`Project: ${project.name}`, 50, y);
        y -= 15;

        // client links
        if (project?.clintSite?.site && project?.clintSite?.git) {
          y = addText(`Client Links`, 50, y);
          y -= 15;

          addLink(
            `Site: ${project?.clintSite?.site}`,
            project?.clintSite?.site,
            50,
            y
          );
          y -= 15;

          addLink(
            `GitHub: ${project?.clintSite?.git}`,
            project?.clintSite?.git,
            50,
            y
          );
          y -= 20;
        }

        // server LInks
        if (project?.serverSite?.site && project?.serverSite?.git) {
          y = addText(`Server Links`, 50, y);
          y -= 15;

          addLink(
            `Site: ${project?.serverSite?.site}`,
            project?.serverSite?.site,
            50,
            y
          );
          y -= 15;

          addLink(
            `GitHub: ${project?.serverSite?.git}`,
            project?.serverSite?.git,
            50,
            y
          );
          y -= 20;
        }

        y = addText(
          `Description: ${project.description}`,
          50,
          y,
          12,
          textColor,
          500
        ); // Wrap text
        y -= 20; // Extra space after each project
      });

      return y - 10; // Extra space after the section
    };

    // Step 6: Add content to the PDF
    yOffset = addAdminInfo(yOffset);
    yOffset = addProfile(yOffset);
    yOffset = addContactInfo(yOffset);
    yOffset = addLanguages(yOffset);

    // Check if we need a new page
    if (yOffset < 100) {
      page = pdfDoc.addPage([595, 842]);
      yOffset = 800;
    }

    yOffset = addEducation(yOffset);

    // need a new page
    page = pdfDoc.addPage([595, 842]);
    yOffset = 800;

    yOffset = addTechnicalSkills(yOffset);

    // Check if we need a new page
    if (yOffset < 100) {
      page = pdfDoc.addPage([595, 842]);
      yOffset = 800;
    }

    yOffset = addProjects(yOffset);

    // Step 6: Save and Download the PDF
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "resume.pdf";
    link.click();
  };

  return (
    <section className="my-fluid-m space-y-fluid relative">
      <div className="text-right">
        <button onClick={handleDownloadPDF} className="btn-prime">
          Download My Resume
        </button>
      </div>
      {/* mian resume */}
      <div className="space-y-fluid-m bg-final text-prime">
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
