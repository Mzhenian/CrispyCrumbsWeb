import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { AuthContext } from "../../../contexts/AuthContext";
import defaultProfileImage from "../../../components/iconsLab/defaultUserProfileImage.png";

import "./profilePhoto.css";

const ProfilePhoto = () => {
  const { theme } = useContext(ThemeContext);
  const { currentUser, logout } = useContext(AuthContext);
  const [profilePhoto, setProfilePhoto] = useState(defaultProfileImage);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const navigate = useNavigate();
  const popupRef = useRef(null);

  useEffect(() => {
    if (currentUser && currentUser.profilePhoto && currentUser.profilePhoto !== "null") {
      setProfilePhoto(`${process.env.REACT_APP_API_URL}/api/db${currentUser.profilePhoto}`);
    } else {
      setProfilePhoto(defaultProfileImage);
    }
  }, [currentUser]);

  const handleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleOptionClick = (action) => {
    setIsMenuVisible(false);
    action();
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsMenuVisible(false);
    }
  };

  useEffect(() => {
    if (isMenuVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuVisible]);

  const popup = (
    <div className={`popup ${theme}`} ref={popupRef}>
      <div
        className="popup-row"
        onClick={() => handleOptionClick(() => navigate(`/crumb/${currentUser._id.toString()}`))}
      >
        View my profile
      </div>
      <div className="popup-row" onClick={() => handleOptionClick(() => navigate(`/crumb/edit`))}>
        Edit my profile
      </div>
      <div className="popup-row" onClick={() => handleOptionClick(logout)}>
        Log out
      </div>
    </div>
  );

  return (
    <>
      <img src={profilePhoto} className={`profile-photo ${theme}`} onClick={handleMenu} alt={currentUser.userName} />
      {isMenuVisible && popup}
    </>
  );
};

export default ProfilePhoto;
