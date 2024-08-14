import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AuthContext } from "../../contexts/AuthContext";
import "./Buttons.css";

const SubscribeButton = ({ userToSubscribe }) => {
  const { theme } = useContext(ThemeContext);
  const { followUnfollowUser, isFollowing, getUserById, currentUser } = useContext(AuthContext);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const updateSubscriptionStatus = async () => {
      if (userToSubscribe && currentUser) {
        const isSubscribed = await isFollowing(userToSubscribe);
        setSubscribed(isSubscribed);
      }
    };
    updateSubscriptionStatus();
  }, [userToSubscribe, currentUser, isFollowing, getUserById]);

  const handleClick = async (e) => {
    e.preventDefault();
    if (!userToSubscribe || !followUnfollowUser) {
      return;
    }
    try {
      await followUnfollowUser(userToSubscribe, subscribed);
      setSubscribed(!subscribed);
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    }
  };

  if (!currentUser) {
    return (
      <Link to="/login" className={`generic-button ${theme}`} id="subscribe-button">
        Subscribe
      </Link>
    );
  }

  if (userToSubscribe === currentUser._id.toString()) {
    return null;
  }

  return (
    <div>
      <div
        className={subscribed ? `light-button ${theme}` : `generic-button ${theme}`}
        id={`subscribe-button ${theme}`}
        onClick={handleClick}
      >
        {subscribed ? "Unsubscribe" : "Subscribe"}
      </div>
    </div>
  );
};

export default SubscribeButton;
