import React, { useContext } from "react";

import "./profilePhoto.css";

const ProfilePhoto = (profile) => {
  return <>{<img src={profile.profilePhoto} className={`profile-photo`} alt={profile.username} />}</>;
};

export default ProfilePhoto;
