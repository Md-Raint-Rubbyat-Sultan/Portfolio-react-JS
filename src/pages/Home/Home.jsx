import React from "react";
import Banner from "../../components/Home/Banner/Banner";

const Home = () => {
  return (
    <div>
      <Banner />
      <h1 className="text-fluid-l text-prime">Hello</h1>
      <h1 className="text-fluid-m py-fluid-l text-second">Hello</h1>
      <div className="my-fluid-xs">
        <p className="line-clamp-2 text-fluid">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque quae
          id tempora laudantium autem qui molestiae vero ad quos error
          distinctio earum veniam tenetur expedita explicabo rem, quam, iste
          quas.
        </p>
      </div>
      <p className="line-clamp-1 text-fluid-xs">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque quae id
        tempora laudantium autem qui molestiae vero ad quos error distinctio
        earum veniam tenetur expedita explicabo rem, quam, iste quas.
      </p>
      <button className="btn-prime my-fluid">Button</button>
    </div>
  );
};

export default Home;
