import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import ProfilePhoto from "../../components/profilePhoto/ProfilePhoto";
import SubscribeButton from "../../components/buttons/SubscribeButton";
import GenericButton from "../../components/buttons/GenericButton";
import Container from "../../components/container/Container";
import NotFoundRoute from "../../routes/NotFoundRoute";
import "./UserProfile.css";
import VideoList from "./UserProfileComponents/VideoList";

const UserProfile = () => {
  const { userId } = useParams();
  const { currentUser, getUserById } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [showNotFound, setShowNotFound] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUserById(userId);
        setUser(fetchedUser);
      } catch (err) {
        setError(err);
      }
    };
    fetchUser();
  }, [userId, getUserById]);

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        setShowNotFound(true);
      }, 3000); // Delay of 3000 milliseconds (3 seconds)

      // Cleanup the timer if the component unmounts or if user changes
      return () => clearTimeout(timer);
    } else {
      setShowNotFound(false);
    }
  }, [user]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (showNotFound) {
    return <NotFoundRoute />;
  }

  return (
    user && (
      <div className="user-profile">
        <div className="profile-details">
          <Container id="container-style">
            <ProfilePhoto user={user} profilePhotoStyle={"profile-style"} />
            <h1>{user.userName}</h1>
            <div className="linear-layout-2">
              <p>Followers: {user.followers.length}</p>
              <p>Following: {user.following.length}</p>
            </div>
            <p>Country: {user.country}</p>
            <div className="button-container">
              {currentUser && currentUser._id.toString() === userId.toString() ? (
                <GenericButton text="Edit your profile" link="/crumb/edit" />
              ) : (
                <SubscribeButton userToSubscribe={userId.toString()} />
              )}
            </div>
          </Container>
        </div>
        <div className="profile-videos">
          <VideoList userId={userId} />
        </div>
      </div>
    )
  );
};

export default UserProfile;
