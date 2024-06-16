import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./Container.css";

const Container = ({ title, children, containerStyle }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`container ${theme}`} id={containerStyle}>
      {title && (
        <div className={`container-title ${theme}`}>
          <h2>{title}</h2>
        </div>
      )}
      <div className={`container-body ${theme}`}> {children}</div>
    </div>
  );
};

export default Container;
