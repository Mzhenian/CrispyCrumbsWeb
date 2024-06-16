import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../contexts/ThemeContext";
import logoText from "../../iconsLab/logo.svg";
import "./logo.css";

const Logo = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Link to=".">
      <div className={`logo-container ${theme}`}>
        <img className="logo" src={logoText} alt="CrispyCrumbs" />
      </div>
    </Link>
  );
};

export default Logo;
