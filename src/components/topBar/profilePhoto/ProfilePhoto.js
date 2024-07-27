import React, { useContext, useState, useEffect } from "react";
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

  const popup = (
    <div className={`popup ${theme}`}>
      <div className="popup-row" onClick={() => navigate(`/crumb/${currentUser._id.toString()}`)}>
        View my profile
      </div>
      <div className="popup-row" onClick={() => navigate(`/crumb/edit`)}>
        Edit my profile
      </div>
      <div className="popup-row" onClick={logout}>
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
