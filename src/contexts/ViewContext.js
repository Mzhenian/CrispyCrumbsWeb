import React, { createContext, useState, useEffect } from "react";

export const ViewContext = createContext();

export const ViewProvider = ({ children }) => {
  const defaultView = "grid";

  const [view, setView] = useState(() => {
    return localStorage.getItem("viewMode") || defaultView;
  });

  useEffect(() => {
    localStorage.setItem("viewMode", view);
  }, [view]);

  const toggleView = () => {
    setView((prevView) => (prevView === "grid" ? "list" : "grid"));
  };

  return <ViewContext.Provider value={{ view, toggleView }}>{children}</ViewContext.Provider>;
};
