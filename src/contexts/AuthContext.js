import React, { createContext, useState, useEffect, useCallback } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const apiUsersUrl = `${process.env.REACT_APP_API_URL}/api/users`;

  const validateToken = useCallback(async () => {
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
          setCurrentUser({ ...data.user, token, following: data.user.following || [] });
        } else {
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.error("Token validation failed:", err);
      }
    }
  }, [apiUsersUrl]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      validateToken();
    }
    return () => {
      isMounted = false;
    };
  }, [validateToken]);

  const login = async (username, password, rememberMe) => {
    try {
      const response = await fetch(`${apiUsersUrl}/tokens`, {
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
        setCurrentUser({ ...data.user, token: data.token, following: data.user.following || [] });
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
      const formData = new FormData();
      Object.keys(userData).forEach((key) => {
        formData.append(key, userData[key]);
      });

      const response = await fetch(`${apiUsersUrl}`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        setCurrentUser({ ...data.user, token: data.token, following: data.user.following || [] });
      }
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  const followUnfollowUser = async (userId, isCurrentlyFollowing) => {
    const endpoint = isCurrentlyFollowing ? "unfollow" : "follow";
    try {
      const response = await fetch(`${apiUsersUrl}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setCurrentUser((prevUser) => ({
        ...prevUser,
        following: isCurrentlyFollowing
          ? prevUser.following.filter((id) => id !== userId)
          : [...prevUser.following, userId],
      }));
    } catch (err) {
      console.error(`Failed to ${endpoint} user:`, err);
    }
  };

  const isFollowing = async (userIdToCheck) => {
    try {
      const response = await fetch(`${apiUsersUrl}/isFollowing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify({ userId: currentUser._id, userIdToCheck }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.isFollowing;
    } catch (err) {
      console.error(`Check if following failed:`, err);
      return false;
    }
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

  const isEmailAvailable = async (email) => {
    try {
      const response = await fetch(`${apiUsersUrl}/isEmailAvailable`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.available;
    } catch (err) {
      console.error("Check email availability failed:", err);
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

    const getUserBasicById = async (userId) => {
      try {
        const response = await fetch(`${apiUsersUrl}/basic/${userId}`, {
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

  const updateUser = async (userId, updatedUser) => {
    try {
      const formData = new FormData();
      Object.keys(updatedUser).forEach((key) => {
        formData.append(key, updatedUser[key]);
      });

      const response = await fetch(`${apiUsersUrl}/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCurrentUser({ ...data, following: data.following || [] });
    } catch (err) {
      console.error("Update user failed:", err);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`${apiUsersUrl}/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setCurrentUser(null);
      localStorage.removeItem("token");
    } catch (err) {
      console.error("Delete user failed:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        getUserById,
        getUserBasicById,
        login,
        logout,
        signup,
        isUsernameAvailable,
        isEmailAvailable,
        followUnfollowUser,
        isFollowing,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
