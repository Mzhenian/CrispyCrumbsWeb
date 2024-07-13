import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AuthContext } from "../../contexts/AuthContext";
import "./Buttons.css";

const SubscribeButton = ({ userToSubscribe, displayNum = false }) => {
  const { theme } = useContext(ThemeContext);
  const { followUser, unfollowUser, isFollowing, getUserById, currentUser } = useContext(AuthContext);
  const [subscribed, setSubscribed] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    if (userToSubscribe && isFollowing) {
      setSubscribed(isFollowing(userToSubscribe));
    }
    if (userToSubscribe && getUserById) {
      const user = getUserById(userToSubscribe);
      if (user && user.followers) {
        setFollowerCount(user.followers.length);
      } else {
        setFollowerCount(0);
      }
    }
  }, [userToSubscribe, isFollowing, getUserById, currentUser]);

  const handleClick = (e) => {
    e.preventDefault();
    if (!userToSubscribe || !followUser || !unfollowUser) {
      return;
    }
    if (subscribed) {
      unfollowUser(userToSubscribe);
      setFollowerCount((prevCount) => prevCount - 1);
    } else {
      followUser(userToSubscribe);
      setFollowerCount((prevCount) => prevCount + 1);
    }
    setSubscribed(!subscribed);
  };

  if (!currentUser) {
    return (
      <Link to="/login" className={`generic-button ${theme}`} id="subscribe-button">
        Subscribe
      </Link>
    );
  }

  if (userToSubscribe === currentUser.userId) {
    return null;
  }

  return (
    <div
      className={subscribed ? `light-button ${theme}` : `generic-button ${theme}`}
      id="subscribe-button"
      onClick={handleClick}
    >
      {subscribed ? "Unsubscribe" : "Subscribe"} {displayNum && followerCount}
    </div>
  );
};

export default SubscribeButton;
