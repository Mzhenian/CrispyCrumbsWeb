import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { VideoContext } from "../../contexts/VideoContext";
import "./watchvideo.css";
import LikeButton from "./watchVideoComponents/likeButton/LikeButton";
import SuggestedVideos from "./watchVideoComponents/suggestedFunctions/SuggestedVideos";
import { ThemeContext } from "../../ThemeContext";
import ProfilePhoto from "../../components/profilePhoto/ProfilePhoto";
import CommentsSection from "./watchVideoComponents/commentsSection/CommentsSection";

const WatchVideo = () => {
  const { theme } = useContext(ThemeContext);
  const { currentUser } = useContext(AuthContext);
  const { videoId } = useParams();
  const { getVideoById, getUserById, likeVideo, dislikeVideo } = useContext(VideoContext);
  const [video, setVideo] = useState(null);
  const [author, setAuthor] = useState(null);
  const [likeSelected, setLikeSelected] = useState(false);
  const [dislikeSelected, setDislikeSelected] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundVideo = getVideoById(videoId);
    if (foundVideo) {
      setVideo(foundVideo);
      setAuthor(getUserById(foundVideo.userId));

      if (currentUser && Array.isArray(foundVideo.likedBy)) {
        setLikeSelected(foundVideo.likedBy.includes(currentUser.userId));
        setDislikeSelected(foundVideo.dislikedBy.includes(currentUser.userId));
      }
    }
  }, [videoId, currentUser, getVideoById, getUserById]);

  const handleLike = () => {
    if (!currentUser) return alert("You must be logged in to like a video.");
    likeVideo(videoId, currentUser.userId);
    setLikeSelected(!likeSelected);
    if (dislikeSelected) setDislikeSelected(false);
  };

  const handleDislike = () => {
    if (!currentUser) return alert("You must be logged in to dislike a video.");
    dislikeVideo(videoId, currentUser.userId);
    setDislikeSelected(!dislikeSelected);
    if (likeSelected) setLikeSelected(false);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const MAX_LENGTH = 100;
  const truncatedDescription =
    video && video.description.length < MAX_LENGTH
      ? video.description
      : showFullDescription
      ? video.description + "   "
      : video && video.description.slice(0, MAX_LENGTH) + "...";

  const videoSection = video && (
    <div className={`container ${theme}`}>
      <video key={video.videoId} controls className="container-video">
        <source src={process.env.PUBLIC_URL + video.videoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={`container-body ${theme}`}>
        <div className="linear-layout-watch">
          <h1 className="single-line-text">{video.title}</h1>
          <div className="buttons">
            <LikeButton
              dislikeCounter={video.dislikes}
              likeCounter={video.likes}
              like={handleLike}
              dislike={handleDislike}
              likeSelected={likeSelected}
              dislikeSelected={dislikeSelected}
            />
          </div>
        </div>

        <div className="author-section">
          {author && (
            <>
              <ProfilePhoto profilePhoto={author.profilePhoto} userName={author.userName} />
              <div className="author-details">
                <b className="author-name">{author.userName}</b>
                <p>{author.followers.length} followers</p>
              </div>
            </>
          )}
        </div>
        <div className="details-section">
          <p className="note">{`${video.views} views`}</p>
          <p className="note">{video.uploadDate}</p>
          {video.tags.slice(0, 5).map((t, index) => (
            <p key={index} className="note">
              #{t}
            </p>
          ))}
        </div>
        <p className="video-description">
          {truncatedDescription}
          {video.description.length >= MAX_LENGTH && (
            <b onClick={toggleDescription} className="read-more">
              {showFullDescription ? " Read less" : " Read more"}
            </b>
          )}
        </p>
      </div>
    </div>
  );

  if (!video) {
    return <div>404 Video not found</div>;
  }

  return (
    <div className="watch-video-container">
      <div className="main-video-section">
        {videoSection}
        <div className="video-details">
          <CommentsSection videoId={videoId} currentUser={currentUser} />
        </div>
      </div>
      <SuggestedVideos />
    </div>
  );
};

export default WatchVideo;
