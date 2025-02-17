import React from "react";
import style from "./OpeningAnimation.module.css";

const OpeningAnimation = () => {
  return (
    <div className={style.firstLayer}>
      <span className={style.welcomeText}>Hello!</span>
      <span className={style.introduction}>I'm Ranit</span>
    </div>
  );
};

export default OpeningAnimation;
