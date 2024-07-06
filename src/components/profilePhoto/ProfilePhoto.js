import React from "react";
import "./ProfilePhoto.css";

const defaultImage = `${process.env.REACT_APP_API_URL}/api/db/users/0.png`;

const ProfilePhoto = ({ user, profilePhotoStyle, img }) => {
  return (
    <img
      src={user ? `${process.env.REACT_APP_API_URL}/api/db${user.profilePhoto}` : img ? img : defaultImage}
      className="profile-photo"
      alt={user ? user.userName : "profile"}
      id={profilePhotoStyle}
    />
  );
};

export default ProfilePhoto;
