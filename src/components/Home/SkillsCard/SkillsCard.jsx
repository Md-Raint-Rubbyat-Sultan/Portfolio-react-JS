import React from "react";
import PropTypes from "prop-types";

const SkillsCard = ({ logo, name, level }) => {
  return (
    <div className="flex items-center gap-fluid-l my-fluid-m">
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
  logo: PropTypes.string,
  name: PropTypes.string,
  level: PropTypes.string,
};

export default SkillsCard;
