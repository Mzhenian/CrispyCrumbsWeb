import React, { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import darkTheme from "../../iconsLab/darkTheme.svg";
import lightTheme from "../../iconsLab/lightTheme.svg";
import "./lightDarkButton.css";

const LightDarkButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`light-dark-button ${theme}`} onClick={toggleTheme}>
      <img className={`light-dark-icon ${theme}`} src={theme === "light" ? darkTheme : lightTheme} alt="theme toggle" />
    </div>
  );
};

export default LightDarkButton;
