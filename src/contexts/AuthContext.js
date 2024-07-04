import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const apiUrl = "http://localhost:1324/api/users";

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token found in localStorage:", token); // Log the token

    if (token) {
      fetch(`${apiUrl}/validateToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log("Response status:", response.status); // Log response status
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Response data:", data); // Log response data
          if (data.valid) {
            setCurrentUser(data.user);
          } else {
            localStorage.removeItem("token");
          }
        })
        .catch((err) => console.error("Token validation failed:", err));
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: username, password }), // Ensure correct field names
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        setCurrentUser(data.user);
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
      const response = await fetch(`${apiUrl}/signup`, {
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
        setCurrentUser(data.user);
      }
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  const followUser = async (userIdToFollow) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/follow`, {
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
      const response = await fetch(`${apiUrl}/unfollow`, {
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
    if (!currentUser) return false;
    return currentUser.following.includes(userIdToCheck);
  };

  const isUsernameAvailable = async (username) => {
    try {
      const response = await fetch(`${apiUrl}/isUsernameAvailable`, {
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
      const response = await fetch(`${apiUrl}/user/${userId}`, {
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
