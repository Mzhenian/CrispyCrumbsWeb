import React from "react";
import "./ProfilePhoto.css";

const ProfilePhoto = ({ profilePhoto, userName, profilePhotoStyle }) => {
  return <img src={profilePhoto} className="profile-photo" alt={userName} id={profilePhotoStyle} />;
};

export default ProfilePhoto;
