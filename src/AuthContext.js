import React, { createContext, useState, useEffect } from "react";
import usersDB from "./DB/usersDB.json";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (loggedUser) {
      setCurrentUser(loggedUser);
    }
  }, []);

  const login = (username, password) => {
    const user = usersDB.users.find((user) => user.userName === username && user.password === password);
    if (user && username !== "") {
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  const signup = (userData) => {
    const newUser = {
      ...userData,
      userId: (usersDB.users.length + 1).toString(),
    };
    usersDB.users.push(newUser);
    setCurrentUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
  };

  return <AuthContext.Provider value={{ currentUser, login, logout, signup }}>{children}</AuthContext.Provider>;
};
