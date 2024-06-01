import React, { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";

const Home = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`page page-${theme}`}>
      <h1>Page 1</h1>
    </div>
  );
};

export default Home;
