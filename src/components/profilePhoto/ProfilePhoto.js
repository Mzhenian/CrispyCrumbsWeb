import React from "react";
import "./ProfilePhoto.css";

const ProfilePhoto = ({ profilePhoto, userName }) => {
  return <img src={profilePhoto} className="profile-photo" alt={userName} />;
};

export default ProfilePhoto;
