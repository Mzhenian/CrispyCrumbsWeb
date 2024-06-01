import React, { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import "./buttons.css";

const GenericButton = ({ text, onClick, icon, link }) => {
  const theme = useContext(ThemeContext).theme;

  return (
    <>
      {link && (
        <a href={link} aria-disabled={true} role="button" tabIndex={0} onClick={onClick}>
          <div className={`generic-button ${theme}`}>
            {text}
            {icon && <img className="button-icon" src={icon} alt={text} />}
          </div>
        </a>
      )}
      {!link && ( // Render the button without a link if link is not provided
        <div className={`generic-button ${theme}`} onClick={onClick}>
          {text}
          {icon && <img className="button-icon" src={icon} alt={text} />}
        </div>
      )}
    </>
  );
};

export default GenericButton;
