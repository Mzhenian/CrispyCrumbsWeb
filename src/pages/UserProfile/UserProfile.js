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
        <Container>
          <ProfilePhoto profilePhoto={user.profilePhoto} userName={user.userName} />
          <h1>{user.fullName}</h1>
          <p>Username: {user.userName}</p>
          <p>Country: {user.country}</p>
          <p>Followers: {user.followers.length}</p>
          <p>Following: {user.following.length}</p>
          <SubscribeButton userToSubscribe={user.userId} />
        </Container>
      </div>
    </div>
  );
};

export default UserProfile;
