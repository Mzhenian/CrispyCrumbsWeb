import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Link } from "react-router-dom";
import "./Buttons.css";

const GenericButton = ({ text, onClick, icon, link, fileInput }) => {
  const theme = useContext(ThemeContext).theme;

  const handleClick = () => {
    if (fileInput && fileInput.current) {
      fileInput.current.click();
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <>
      {link ? (
        <Link to={link} aria-disabled={true} role="button" tabIndex={0} onClick={handleClick}>
          <div className={`generic-button ${theme}`}>
            {text && <div className="button-text">{text}</div>}
            {icon && <img className="button-icon" src={icon} alt={text} />}
          </div>
        </Link>
      ) : (
        <div className={`generic-button ${theme}`} onClick={handleClick}>
          {text && <div className="button-text">{text}</div>}
          {icon && <img className="button-icon" src={icon} alt={text} />}
        </div>
      )}
    </>
  );
};

export default GenericButton;
