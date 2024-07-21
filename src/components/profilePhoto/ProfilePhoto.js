import React from "react";
import "./ProfilePhoto.css";

import defaultProfileImage from "../../components/iconsLab/defaultUserProfileImage.png";

let profilePhoto;

const ProfilePhoto = ({ user, profilePhotoStyle, img }) => {
  if (user && user.profilePhoto && user.profilePhoto !== "null") {
    profilePhoto = `${process.env.REACT_APP_API_URL}/api/db${user.profilePhoto}`;
  }
  return (
    <img
      src={user ? profilePhoto : img ? img : defaultProfileImage}
      className="profile-photo"
      alt={user ? user.userName : "profile"}
      id={profilePhotoStyle}
    />
  );
};

export default ProfilePhoto;
