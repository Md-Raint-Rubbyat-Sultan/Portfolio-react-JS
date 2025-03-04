import React from "react";
import PropTypes from "prop-types";

const SkillsCard = ({ tech, logo, name, level }) => {
  return (
    <div className="flex items-center gap-fluid-l">
      <div className="w-fluid-xl rounded-full overflow-hidden">
        <img src={logo} alt={name} className="object-contain" />
      </div>
      <div className="flex flex-wrap items-center gap-fluid-xs">
        <p className="text-fluid font-semibold">{name}</p>
        {level && <p className="text-fluid font-medium">{`(${level})`}</p>}
      </div>
    </div>
  );
};

SkillsCard.propTypes = {
  tech: PropTypes.array,
  logo: PropTypes.string,
  name: PropTypes.string,
  level: PropTypes.string,
};

export default SkillsCard;
