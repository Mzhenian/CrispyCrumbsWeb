import React, { useContext } from "react";
import { ThemeContext } from "../../../ThemeContext";
import logoText from "../../iconsLab/logo.svg";
import "./logo.css";

const Logo = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <a href=".">
      <div className={`logo-container ${theme}`}>
        <img className="logo" src={logoText} alt="CrispyCrumbs" />
      </div>
    </a>
  );
};

export default Logo;
