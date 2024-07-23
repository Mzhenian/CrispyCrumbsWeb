import React from "react";
import { useNavigate } from "react-router-dom";

import "./ProfilePhoto.css";
import defaultProfileImage from "../../components/iconsLab/defaultUserProfileImage.png";

let profilePhoto;

const ProfilePhoto = ({ user, profilePhotoStyle, img, clickable = false }) => {
  const navigate = useNavigate();

  if (user && user.profilePhoto && user.profilePhoto !== "null") {
    profilePhoto = `${process.env.REACT_APP_API_URL}/api/db${user.profilePhoto}`;
  }

  const handleAuthorClick = (e, profileId) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/crumb/${profileId}`);
  };

  return (
    <div onClick={(e) => clickable && handleAuthorClick(e, user._id)} id={clickable && "clickable"}>
      <img
        src={user ? profilePhoto : img ? img : defaultProfileImage}
        className="profile-photo"
        alt={user ? user.userName : "profile"}
        id={profilePhotoStyle}
      />
    </div>
  );
};

export default ProfilePhoto;
