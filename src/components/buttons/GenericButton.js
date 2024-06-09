import { React, useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import { Link } from "react-router-dom";
import "./buttons.css";

const GenericButton = ({ text, onClick, icon, link }) => {
  const theme = useContext(ThemeContext).theme;

  return (
    <>
      {link && (
        <Link to={link} aria-disabled={true} role="button" tabIndex={0} onClick={onClick}>
          <div className={`generic-button ${theme}`}>
            {text}
            {icon && <img className="button-icon" src={icon} alt={text} />}
          </div>
        </Link>
      )}
      {!link && (
        <div className={`generic-button ${theme}`} onClick={onClick}>
          {text}
          {icon && <img className="button-icon" src={icon} alt={text} />}
        </div>
      )}
    </>
  );
};

export default GenericButton;
