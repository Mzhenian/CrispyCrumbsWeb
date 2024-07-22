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
    let isMounted = true; // flag to indicate if the component is mounted
    if (isMounted) {
      validateToken();
    }
    return () => {
      isMounted = false; // cleanup function to set isMounted to false when the component unmounts
    };
  }, [validateToken]);

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

  const followUser = async (userIdToFollow) => {
    console.log(`Attempting to follow user: ${userIdToFollow}`);
    try {
      const response = await fetch(`${apiUsersUrl}/follow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify({ userIdToFollow }),
      });

      if (!response.ok) {
        //const error = await response.text();
        //console.error(`Error following user: ${error}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setCurrentUser((prevUser) => ({
        ...prevUser,
        following: [...(prevUser.following || []), userIdToFollow],
      }));
      console.log(`Successfully followed user: ${userIdToFollow}`);
    } catch (err) {
      console.error("Follow user failed:", err);
    }
  };

  const unfollowUser = async (userIdToUnfollow) => {
    console.log(`Attempting to unfollow user: ${userIdToUnfollow}`);
    try {
      const response = await fetch(`${apiUsersUrl}/unfollow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify({ userIdToUnfollow }),
      });

      if (!response.ok) {
        //const error = await response.text();
        //console.error(`Error unfollowing user: ${error}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setCurrentUser((prevUser) => ({
        ...prevUser,
        following: prevUser.following.filter((id) => id !== userIdToUnfollow),
      }));
      console.log(`Successfully unfollowed user: ${userIdToUnfollow}`);
    } catch (err) {
      console.error("Unfollow user failed:", err);
    }
  };

  const isFollowing = (userIdToCheck) => {
    return currentUser?.following?.includes(userIdToCheck);
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
        login,
        logout,
        signup,
        isUsernameAvailable,
        isEmailAvailable,
        followUser,
        unfollowUser,
        isFollowing,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
