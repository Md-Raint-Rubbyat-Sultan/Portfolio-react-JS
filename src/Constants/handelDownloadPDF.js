import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import toCapital from "./toCapital";

const handleDownloadPDF = async (adminData, projectsDB) => {
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

export default handleDownloadPDF;
