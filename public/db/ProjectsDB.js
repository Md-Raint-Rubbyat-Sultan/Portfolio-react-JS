const projectsDB = [
  {
    id: "1",
    name: "Portfolio",
    clintSite: {
      site: "http://localhost:5173/",
      git: "https://github.com/Md-Raint-Rubbyat-Sultan/Portfolio-react-JS",
    },
    serverSite: {
      site: "",
      git: "",
    },
    technologies: [
      {
        category: "frontend",
        tech: [
          { name: "ViteJS", logo: "https://i.ibb.co.com/FLXtFBj6/vitejs.png" },
          {
            name: "ReactJS",
            logo: "https://i.ibb.co.com/6cc0mB8V/reactjs.png",
          },
          {
            name: "React Router Dom",
            logo: "https://i.ibb.co.com/DDSmB8kx/react-Router-Dom.png",
          },
          {
            name: "Tailwind CSS",
            logo: "https://i.ibb.co.com/jPpCjrcf/tailwind-Css.png",
          },
        ],
      },
      {
        category: "backend",
        tech: [
          { name: "NodeJS", logo: "https://i.ibb.co.com/ymY55tKm/NodeJs.png" },
        ],
      },
      {
        category: "authentication",
        authentication: [
          {
            name: "Firebase",
            logo: "https://i.ibb.co.com/21VwVw5Q/firebase.png",
          },
        ],
      },
      {
        category: "versionControl",
        versionControl: [
          { name: "Github", logo: "https://i.ibb.co.com/bgv4TM40/github.png" },
        ],
      },
    ],
    description: "",
    chalanges: [
      {
        img: "https://i.ibb.co.com/Qjbdq83C/mainPage.png",
        chalange:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit sequi esse vitae omnis excepturi minus veritatis officiis laudantium esse vitae omnis excepturi minus veritatis officiis laudantium deleniti nobis, hic nesciunt beatae, facilis quasi explicabo neque a praesentium perspiciatis!",
      },
      {
        img: "https://i.ibb.co.com/6cc0mB8V/reactjs.png",
        chalange:
          "Not lorem ipsum text adipisicing elit. Velit sequi esse vitae omnis excepturi minus veritatis officiis laudantium esse vitae omnis excepturi minus veritatis officiis laudantium deleniti nobis, hic nesciunt beatae, facilis quasi explicabo neque a praesentium perspiciatis!",
      },
      {
        img: "https://i.ibb.co.com/ymY55tKm/NodeJs.png",
        chalange:
          "Absouletly not an extra lorem ipsum text adipisicing elit. Velit sequi esse vitae omnis excepturi minus veritatis officiis laudantium esse vitae omnis excepturi minus.",
      },
    ],
  },
];

export default projectsDB;
