import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axiosInstance from "../utils/AxiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axiosInstance.get("/users/current-user");
        setCurrentUser(response.data.user);
      } catch (error) {
        console.log("No user is logged in");
      }
    };
    fetchCurrentUser();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axiosInstance.post("/users/login", { username, password });
      setCurrentUser(response.data.user);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/users/logout");
      setCurrentUser(null);
      Cookies.remove("session");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const signup = async (userData) => {
    try {
      const response = await axiosInstance.post("/users/signup", userData);
      setCurrentUser(response.data.user);
      Cookies.set("session", response.data.session, { expires: 1 });
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const isUsernameAvailable = async (username) => {
    try {
      const response = await axiosInstance.get(`/users/check-username/${username}`);
      return response.data.available;
    } catch (error) {
      console.error("Username check failed:", error);
      return false;
    }
  };

  const followUser = async (userIdToFollow) => {
    if (!currentUser) return false;
    try {
      const response = await axiosInstance.post("/users/follow", { userIdToFollow });
      setCurrentUser(response.data.updatedUser);
      return true;
    } catch (error) {
      console.error("Follow user failed:", error);
      return false;
    }
  };

  const unfollowUser = async (userIdToUnfollow) => {
    if (!currentUser) return false;
    try {
      const response = await axiosInstance.post("/users/unfollow", { userIdToUnfollow });
      setCurrentUser(response.data.updatedUser);
      return true;
    } catch (error) {
      console.error("Unfollow user failed:", error);
      return false;
    }
  };

  const isFollowing = (userIdToCheck) => {
    if (!currentUser) return false;
    return currentUser.following.includes(userIdToCheck);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        signup,
        isUsernameAvailable,
        followUser,
        unfollowUser,
        isFollowing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
