import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import ProfilePhoto from "../../components/profilePhoto/ProfilePhoto";
import SubscribeButton from "../../components/buttons/SubscribeButton";
import Container from "../../components/container/Container";
import "./UserProfile.css";
import VideoList from "./UserProfileComponents/VideoList";

const UserProfile = () => {
  const { userId } = useParams();
  const { getUserById } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchedUser = getUserById(userId);
    setUser(fetchedUser);
  }, [userId, getUserById]);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="user-profile">
      <div className="profile-videos">
        <VideoList userId={userId} />
      </div>
      <div className="profile-details">
        <Container id="container-style">
          <ProfilePhoto profilePhoto={user.profilePhoto} userName={user.userName} profilePhotoStyle={"profile-style"} />
          <h1>{user.userName}</h1>
          <div className="linear-layout-2">
            <p>Followers: {user.followers.length}</p>
            <p>Following: {user.following.length}</p>
          </div>
          <p>Country: {user.country}</p>

          <SubscribeButton userToSubscribe={user.userId} />
        </Container>
      </div>
    </div>
  );
};

export default UserProfile;
