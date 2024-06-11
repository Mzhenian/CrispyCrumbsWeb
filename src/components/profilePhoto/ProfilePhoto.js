import React from "react";
import "./profilePhoto.css";

const ProfilePhoto = ({ profilePhoto, userName }) => {
  return <img src={process.env.PUBLIC_URL + profilePhoto} className="profile-photo" alt={userName} />;
};

export default ProfilePhoto;
