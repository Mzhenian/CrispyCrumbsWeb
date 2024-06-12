import React from "react";
import "./profilePhoto.css";

const ProfilePhoto = ({ profilePhoto, userName }) => {
  return <img src={profilePhoto} className="profile-photo" alt={userName} />;
};

export default ProfilePhoto;
