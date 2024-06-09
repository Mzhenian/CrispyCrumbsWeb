import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../../ThemeContext";
import { AuthContext } from "../../../AuthContext";

import "./profilePhoto.css";

const ProfilePhoto = () => {
  const { theme } = useContext(ThemeContext);
  const { currentUser, logout } = useContext(AuthContext);
  const [profilePhoto, setProfilePhoto] = useState(null); // State to store profile photo
  const [isMenuVisible, setIsMenuVisible] = useState(false); // State to toggle popup

  useEffect(() => {
    setProfilePhoto(currentUser.profilePhoto);
  }, [currentUser.profilePhoto]);

  const handleMenu = () => {
    setIsMenuVisible(!isMenuVisible); 
  };

  const popup = (
    <div className={`popup ${theme}`}>
      <div className="popup-row">View my profile</div>
      <div className="popup-row">Settings</div>
      <div className="popup-row" onClick={logout}>
        Log out
      </div>
    </div>
  );

  return (
    <>
      {profilePhoto && (
        <img
          src={currentUser.profilePhoto}
          className={`profile-photo ${theme}`}
          onClick={(e) => handleMenu()}
          alt={currentUser.username}
        />
      )}
      {isMenuVisible && popup}
    </>
  );
};

export default ProfilePhoto;
