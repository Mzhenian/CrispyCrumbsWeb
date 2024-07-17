import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const apiUsersUrl = `${process.env.REACT_APP_API_URL}/api/users`;

  const validateToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch(`${apiUsersUrl}/validateToken`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.valid) {
          setCurrentUser({ ...data.user, token });
        } else {
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.error("Token validation failed:", err);
      }
    }
  };

  useEffect(() => {
    let isMounted = true; // flag to indicate if the component is mounted
    if (isMounted) {
      validateToken();
    }
    return () => {
      isMounted = false; // cleanup function to set isMounted to false when the component unmounts
    };
  }, [apiUsersUrl]);

  const login = async (username, password, rememberMe) => {
    try {
      const response = await fetch(`${apiUsersUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: username, password: password, rememberMe: rememberMe }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        setCurrentUser({ ...data.user, token: data.token });
        return true;
      }
      return false;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("token");
  };

  const signup = async (userData) => {
    try {
      const response = await fetch(`${apiUsersUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        setCurrentUser({ ...data.user, token: data.token });
      }
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  const followUser = async (userIdToFollow) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUsersUrl}/follow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userIdToFollow }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        setCurrentUser((prevUser) => ({
          ...prevUser,
          following: [...prevUser.following, userIdToFollow],
        }));
      }
    } catch (err) {
      console.error("Follow user failed:", err);
    }
  };

  const unfollowUser = async (userIdToUnfollow) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUsersUrl}/unfollow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userIdToUnfollow }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        setCurrentUser((prevUser) => ({
          ...prevUser,
          following: prevUser.following.filter((id) => id !== userIdToUnfollow),
        }));
      }
    } catch (err) {
      console.error("Unfollow user failed:", err);
    }
  };

  const isFollowing = (userIdToCheck) => {
    if (!currentUser || !Array.isArray(currentUser.following)) return false;
    return currentUser.following.includes(userIdToCheck);
  };

  const isUsernameAvailable = async (username) => {
    try {
      const response = await fetch(`${apiUsersUrl}/isUsernameAvailable`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.available;
    } catch (err) {
      console.error("Check username availability failed:", err);
      return false;
    }
  };

  const getUserById = async (userId) => {
    try {
      const response = await fetch(`${apiUsersUrl}/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(`Get user by ID failed: ${userId}`, err);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        getUserById,
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
