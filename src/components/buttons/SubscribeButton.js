import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AuthContext } from "../../contexts/AuthContext";
import "./Buttons.css";

const SubscribeButton = ({ userToSubscribe, displayNum = false }) => {
  const theme = useContext(ThemeContext).theme;
  const { followUser, unfollowUser, isFollowing, getUserById, currentUser } = useContext(AuthContext);
  const [subscribed, setSubscribed] = useState(isFollowing(userToSubscribe));
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    setSubscribed(isFollowing(userToSubscribe));
    const user = getUserById(userToSubscribe);
    console.log();

    if (currentUser && user) {
      setFollowerCount(user.followers.length);
    }
  }, [userToSubscribe, isFollowing, getUserById, currentUser]);

  const handleClick = (e) => {
    e.preventDefault();
    if (subscribed) {
      unfollowUser(userToSubscribe);
      setFollowerCount((prevCount) => prevCount - 1);
    } else {
      followUser(userToSubscribe);
      setFollowerCount((prevCount) => prevCount + 1);
    }
    setSubscribed(!subscribed);
  };

  return !currentUser ? (
    <Link to="/login" className={`generic-button ${theme}`} id="subscribe-button">
      Subscribe
    </Link>
  ) : (
    userToSubscribe !== currentUser.userId && (
      <div
        className={subscribed ? `light-button ${theme}` : `generic-button ${theme}`}
        id="subscribe-button"
        onClick={handleClick}
      >
        {subscribed ? "Unsubscribe" : "Subscribe"} {displayNum && followerCount}
      </div>
    )
  );
};

export default SubscribeButton;
