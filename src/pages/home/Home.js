import React, { useContext, useState } from "react";
import { ThemeContext } from "../../ThemeContext.js";

const Home = () => {
  const { theme } = useContext(ThemeContext);

  return <div className={`page page-${theme}`}></div>;
};

export default Home;
