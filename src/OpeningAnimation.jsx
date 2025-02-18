import React from "react";
import style from "./OpeningAnimation.module.css";

const OpeningAnimation = () => {
  return (
    <div>
      <div className={style.firstLayer}>
        <span className={style.welcomeText}>Hello!</span>
        <span className={style.introduction}>I'm Ranit</span>
      </div>
      <div className={style.secondLayer}></div>
    </div>
  );
};

export default OpeningAnimation;
