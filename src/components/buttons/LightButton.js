import { React, useContext } from "react";
import { Link } from "react-router-dom";

import { ThemeContext } from "../../contexts/ThemeContext";
import "./Buttons.css";

const LightButton = ({ text, onClick, icon, link }) => {
  const theme = useContext(ThemeContext).theme;

  return (
    <>
      {link && (
        <Link to={link} aria-disabled={true} role="button" tabIndex={0} onClick={onClick}>
          <div className={`light-button ${theme}`}>
            {text}
            {icon && <img className="button-icon" src={icon} alt={text} />}
          </div>
        </Link>
      )}
      {!link && (
        <div className={`light-button ${theme}`} onClick={onClick}>
          {text}
          {icon && <img className="button-icon" src={icon} alt={text} />}
        </div>
      )}
    </>
  );
};

export default LightButton;
