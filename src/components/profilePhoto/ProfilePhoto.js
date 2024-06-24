import React from "react";
import "./ProfilePhoto.css";

const ProfilePhoto = ({ profilePhoto, userName, profilePhotoStyle, img }) => {
  return (
    <img
      src={profilePhoto ? profilePhoto : img}
      className="profile-photo"
      alt={userName ? userName : "profile"}
      id={profilePhotoStyle}
    />
  );
};

export default ProfilePhoto;
