import React, { createContext, useState } from "react";

export const ViewContext = createContext();

export const ViewProvider = ({ children }) => {
  const [view, setView] = useState("grid");

  const toggleView = () => {
    setView((prevView) => (prevView === "grid" ? "list" : "grid"));
  };

  return <ViewContext.Provider value={{ view, toggleView }}>{children}</ViewContext.Provider>;
};
