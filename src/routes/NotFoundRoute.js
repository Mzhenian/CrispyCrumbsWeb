import React from "react";
import sad404 from "../components/iconsLab/notFound.svg";
import "./Routs.css";

const NotFoundRoute = () => {
  return (
    <div className="route">
      <img src={sad404} alt="not-found" />
      <h1>404</h1>
      <p>Page Not Found</p>
    </div>
  );
};

export default NotFoundRoute;
