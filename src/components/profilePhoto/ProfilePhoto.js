import React from "react";
import { useNavigate } from "react-router-dom";

import "./ProfilePhoto.css";
import defaultProfileImage from "../../components/iconsLab/defaultUserProfileImage.png";

const ProfilePhoto = ({ user, profilePhotoStyle, img, clickable = false }) => {
  const navigate = useNavigate();

  const profilePhoto =
    user && user.profilePhoto && user.profilePhoto !== "null"
      ? `${process.env.REACT_APP_API_URL}/api/db${user.profilePhoto}`
      : img
      ? img
      : defaultProfileImage;

  const handleAuthorClick = (e, profileId) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/crumb/${profileId}`);
  };

  return (
    (user || img) && (
      <div onClick={(e) => clickable && handleAuthorClick(e, user._id)} id={clickable ? "clickable" : undefined}>
        <img
          src={profilePhoto}
          className="profile-photo"
          alt={user ? user.userName : "profile"}
          id={profilePhotoStyle ? profilePhotoStyle : undefined}
        />
      </div>
    )
  );
};

export default ProfilePhoto;
