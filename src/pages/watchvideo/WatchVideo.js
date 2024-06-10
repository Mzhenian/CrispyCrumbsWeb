import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import videoDB from "../../DB/videosDB.json";
import usersDB from "../../DB/usersDB.json";
import "./watchvideo.css";
import LikeButton from "./watchVideoComponents/likeButton/LikeButton";
import { AuthContext } from "../../AuthContext";
import { ThemeContext } from "../../ThemeContext";
import ProfilePhoto from "../../components/profilePhoto/ProfilePhoto";
import CommentsSection from "./watchVideoComponents/commentsSection/CommentsSection";

const WatchVideo = () => {
  const { theme } = useContext(ThemeContext);
  const { currentUser } = useContext(AuthContext);
  const { videoId } = useParams(); // Get videoId from URL parameters
  const [video, setVideo] = useState(null);
  const [author, setAuthor] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [views, setViews] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likeSelected, setLikeSelected] = useState(false);
  const [dislikeSelected, setDislikeSelected] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const foundVideo = videoDB.videos.find((v) => v.videoId === videoId);
    if (foundVideo) {
      setVideo(foundVideo);
      setLikes(foundVideo.likes);
      setDislikes(foundVideo.dislikes);
      setViews((prevViews) => prevViews + 1);
      setComments(foundVideo.comments);

      const foundAuthor = usersDB.users.find((user) => user.userId === foundVideo.userId);
      setAuthor(foundAuthor);

      if (currentUser) {
        setLikeSelected(foundVideo.likedBy.includes(currentUser.userId));
        setDislikeSelected(foundVideo.dislikedBy.includes(currentUser.userId));
      }
    }
  }, [videoId, currentUser]);

  const handleLike = () => {
    if (!currentUser) return alert("You must be logged in to like a video.");

    setLikeSelected((prevLikeSelected) => {
      const newLikeSelected = !prevLikeSelected;
      if (newLikeSelected) {
        setLikes((prevLikes) => prevLikes + 1);
        setDislikeSelected(false);
        setDislikes((prevDislikes) => (dislikeSelected ? prevDislikes - 1 : prevDislikes));
      } else {
        setLikes((prevLikes) => prevLikes - 1);
      }
      return newLikeSelected;
    });
  };

  const handleDislike = () => {
    if (!currentUser) return alert("You must be logged in to dislike a video.");

    setDislikeSelected((prevDislikeSelected) => {
      const newDislikeSelected = !prevDislikeSelected;
      if (newDislikeSelected) {
        setDislikes((prevDislikes) => prevDislikes + 1);
        setLikeSelected(false);
        setLikes((prevLikes) => (likeSelected ? prevLikes - 1 : prevLikes));
      } else {
        setDislikes((prevDislikes) => prevDislikes - 1);
      }
      return newDislikeSelected;
    });
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
      <video controls className="container-video">
        <source src={process.env.PUBLIC_URL + video.videoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={`container-body ${theme}`}>
        <div className="linear-layout-watch">
          <h1 className="single-line-text">{video.title}</h1>
          <div className="buttons">
            <LikeButton
              dislikeCounter={dislikes}
              likeCounter={likes}
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
              <ProfilePhoto profile={author.profilePhoto} />
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
      {videoSection}
      <div className="video-details">
        <CommentsSection videoId={videoId} currentUser={currentUser} comments={comments} setComments={setComments} />
      </div>
    </div>
  );
};

export default WatchVideo;
