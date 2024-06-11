import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../../ThemeContext";
import { AuthContext } from "../../../AuthContext";
import "./profilePhoto.css";

const ProfilePhoto = () => {
  const { theme } = useContext(ThemeContext);
  const { currentUser, logout } = useContext(AuthContext);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.profilePhoto) {
      setProfilePhoto(currentUser.profilePhoto);
      console.log("Profile photo set to:", currentUser.profilePhoto);
    }
  }, [currentUser]);

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
          src={process.env.PUBLIC_URL + profilePhoto}
          className={`profile-photo ${theme}`}
          onClick={handleMenu}
          alt={currentUser.userName}
        />
      )}
      {isMenuVisible && popup}
    </>
  );
};

export default ProfilePhoto;
