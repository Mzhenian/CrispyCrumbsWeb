import React, { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import check from "../../iconsLab/check.svg";
import "./onOffToggle.css";

const OnOffToggle = ({ value, action }) => {
  // Destructure props
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`toggle  ${value ? "on" : "off"} ${theme}`} onClick={action}>
      {value && <img className={`toggle-icon ${theme}`} src={check} alt="toggle" />}
    </div>
  );
};

export default OnOffToggle;
