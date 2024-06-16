import React, { createContext, useState, useEffect } from "react";
import usersDB from "../DB/usersDB.json";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(usersDB.users);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (loggedUser) {
      setCurrentUser(loggedUser);
    }

    const savedUsers = JSON.parse(localStorage.getItem("usersDB"));
    if (savedUsers) {
      setUsers(savedUsers.users);
    }
  }, []);

  const login = (username, password) => {
    const user = users.find((user) => user.userName === username && user.password === password);
    if (user) {
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
      userId: (users.length + 1).toString(),
      followers: [],
      following: [],
      videosIds: [],
      likedVideoIds: [],
      dislikedVideoIds: [],
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    localStorage.setItem("usersDB", JSON.stringify({ users: updatedUsers })); // Save updated users to localStorage
  };

  const isUsernameAvailable = (username) => {
    return !users.some((user) => user.userName === username);
  };

  const getUserById = (userId) => {
    return users.find((user) => user.userId === userId);
  };

  const followUser = (userIdToFollow) => {
    if (!currentUser) return false;
    if (currentUser.following.includes(userIdToFollow)) return false;

    const updatedCurrentUser = {
      ...currentUser,
      following: [...currentUser.following, userIdToFollow],
    };

    const updatedUsers = users.map((user) => {
      if (user.userId === currentUser.userId) {
        return updatedCurrentUser;
      } else if (user.userId === userIdToFollow) {
        return {
          ...user,
          followers: [...user.followers, currentUser.userId],
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    setCurrentUser(updatedCurrentUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));
    localStorage.setItem("usersDB", JSON.stringify({ users: updatedUsers }));
    return true;
  };

  const unfollowUser = (userIdToUnfollow) => {
    if (!currentUser) return false;
    if (!currentUser.following.includes(userIdToUnfollow)) return false;

    const updatedCurrentUser = {
      ...currentUser,
      following: currentUser.following.filter((id) => id !== userIdToUnfollow),
    };

    const updatedUsers = users.map((user) => {
      if (user.userId === currentUser.userId) {
        return updatedCurrentUser;
      } else if (user.userId === userIdToUnfollow) {
        return {
          ...user,
          followers: user.followers.filter((id) => id !== currentUser.userId),
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    setCurrentUser(updatedCurrentUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));
    localStorage.setItem("usersDB", JSON.stringify({ users: updatedUsers }));
    return true;
  };

  const isFollowing = (userIdToCheck) => {
    if (!currentUser) return false;
    return currentUser.following.includes(userIdToCheck);
  };


  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        login,
        logout,
        signup,
        isUsernameAvailable,
        getUserById,
        followUser,
        unfollowUser,
        isFollowing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
