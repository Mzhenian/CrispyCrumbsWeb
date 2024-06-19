import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { AuthContext } from "../../../contexts/AuthContext";
import "./profilePhoto.css";

const ProfilePhoto = () => {
  const { theme } = useContext(ThemeContext);
  const { currentUser, logout } = useContext(AuthContext);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && currentUser.profilePhoto) {
      setProfilePhoto(currentUser.profilePhoto);
    }
  }, [currentUser]);

  const handleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const popup = (
    <div className={`popup ${theme}`}>
      <div className="popup-row" onClick={() => navigate(`/crumb/${currentUser.userId}`)}>
        View my profile
      </div>
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
