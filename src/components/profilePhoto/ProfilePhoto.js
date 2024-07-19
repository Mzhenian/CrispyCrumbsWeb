import React from "react";
import "./ProfilePhoto.css";

const defaultImage = `${process.env.REACT_APP_API_URL}/api/db/users/0.png`;

const ProfilePhoto = ({ user, profilePhotoStyle, img }) => {
  const profilePhoto = user && user.profilePhoto ? `${process.env.REACT_APP_API_URL}/api/db${user.profilePhoto}` : img ? img : defaultImage;
  
  return (
    <img
      src={profilePhoto}
      className="profile-photo"
      alt={user ? user.userName : "profile"}
      id={profilePhotoStyle}
    />
  );
};

export default ProfilePhoto;
