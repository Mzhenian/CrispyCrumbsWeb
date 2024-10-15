import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { VideoContext } from "../../contexts/VideoContext";
import "./WatchVideo.css";
import LikeButton from "./watchVideoComponents/likeButton/LikeButton";
import SuggestedVideos from "./watchVideoComponents/suggestedVideos/SuggestedVideos";
import { ThemeContext } from "../../contexts/ThemeContext";
import ProfilePhoto from "../../components/profilePhoto/ProfilePhoto";
import CommentsSection from "./watchVideoComponents/commentsSection/CommentsSection";
import SubscribeButton from "../../components/buttons/SubscribeButton";
import GenericButton from "../../components/buttons/GenericButton";
import SharePopup from "./watchVideoComponents/shareVideoPopup/SharePopup";
import NotFoundRoute from "../../routes/NotFoundRoute";

const WatchVideo = () => {
  const { theme } = useContext(ThemeContext);
  const { currentUser, getUserById } = useContext(AuthContext);
  const { getVideoById, likeVideo, dislikeVideo, incrementViews } = useContext(VideoContext);

  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [author, setAuthor] = useState(null);
  const [likeSelected, setLikeSelected] = useState(false);
  const [dislikeSelected, setDislikeSelected] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const navigate = useNavigate();
  const hasIncrementedView = useRef(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);

  useEffect(() => {
    const fetchVideoAndAuthor = async () => {
      try {
        const foundVideo = await getVideoById(videoId);
        if (foundVideo) {
          setVideo(foundVideo);
          const videoAuthor = await getUserById(foundVideo.userId);
          setAuthor(videoAuthor);

          if (currentUser && Array.isArray(foundVideo.likedBy)) {
            setLikeSelected(foundVideo.likedBy.includes(currentUser._id.toString()));
            setDislikeSelected(foundVideo.dislikedBy.includes(currentUser._id.toString()));
          } else if (!currentUser) {
            setLikeSelected(false);
            setDislikeSelected(false);
          }

          if (!hasIncrementedView.current) {
            hasIncrementedView.current = true;
            await incrementViews(videoId);
            setVideo((prevVideo) => ({ ...prevVideo, views: prevVideo.views + 1 }));
          }
        }
      } catch (error) {
        console.error("Error fetching video or author:", error);
      }
    };
    fetchVideoAndAuthor();
  }, [videoId, currentUser, getVideoById, getUserById, incrementViews]);

  useEffect(() => {
    hasIncrementedView.current = false;
  }, [videoId]);

  // Handle likes
  const handleLike = async () => {
    if (!currentUser) return navigate("/login");

    try {
      await likeVideo(videoId, currentUser._id.toString());

      setLikeSelected((prev) => !prev);
      setVideo((prevVideo) => {
        if (likeSelected) {
          // Decrement likes if previously liked
          return {
            ...prevVideo,
            likes: prevVideo.likes - 1,
          };
        } else if (dislikeSelected) {
          // Toggle from dislike to like
          return {
            ...prevVideo,
            dislikes: prevVideo.dislikes - 1,
            likes: prevVideo.likes + 1,
          };
        } else {
          // Increment likes
          return {
            ...prevVideo,
            likes: prevVideo.likes + 1,
          };
        }
      });
      if (dislikeSelected) {
        setDislikeSelected(false);
      }
    } catch (error) {
      console.error("Error liking video:", error);
    }
  };

  // Handle dislikes
  const handleDislike = async () => {
    if (!currentUser) return navigate("/login");

    try {
      await dislikeVideo(videoId, currentUser._id.toString());

      setDislikeSelected((prev) => !prev);
      setVideo((prevVideo) => {
        if (dislikeSelected) {
          // Decrement dislikes if previously disliked
          return {
            ...prevVideo,
            dislikes: prevVideo.dislikes - 1,
          };
        } else if (likeSelected) {
          // Toggle from like to dislike
          return {
            ...prevVideo,
            likes: prevVideo.likes - 1,
            dislikes: prevVideo.dislikes + 1,
          };
        } else {
          // Increment dislikes
          return {
            ...prevVideo,
            dislikes: prevVideo.dislikes + 1,
          };
        }
      });
      if (likeSelected) {
        setLikeSelected(false);
      }
    } catch (error) {
      console.error("Error disliking video:", error);
    }
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const videoTags = () =>
    video.tags.slice(0, 5).map((t, index) => (
      <p key={index} className="note">
        #{t}
      </p>
    ));

  const MAX_LENGTH = 100;
  const truncatedDescription =
    video && video.description.length < MAX_LENGTH
      ? video.description
      : showFullDescription
      ? video.description + "   "
      : video && video.description.slice(0, MAX_LENGTH) + "...";

  const videoSection = video && (
    <div className={`container ${theme}`}>
      <video key={video._id.toString()} controls className="container-video" autoPlay>
        <source src={`${process.env.REACT_APP_API_URL}/api/db${video.videoFile}`} type="video/mp4" />
        Not supported
      </video>
      <div className={`container-body ${theme}`}>
        <div className="linear-layout-watch">
          <h1 className="single-line-text">{video.title}</h1>
          <div className="buttons">
            <div>
              <GenericButton text="Share" onClick={() => setIsShareOpen(true)} />
            </div>
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
              <Link to={`/crumb/${author._id.toString()}`} className="no-link-style">
                <ProfilePhoto user={author} />
              </Link>
              <Link to={`/crumb/${author._id.toString()}`} className="no-link-style">
                <div className="author-details">
                  <b className="author-name">{author.userName}</b>
                  <p>{author.followers?.length || 0} followers</p>
                </div>
              </Link>
              {currentUser && author && currentUser._id.toString() === author._id.toString() ? (
                <GenericButton text="Edit this video" link={`/edit/${videoId}`} />
              ) : (
                <SubscribeButton userToSubscribe={author._id.toString()} displayNum={true} />
              )}
            </>
          )}
        </div>
        <div className="details-section">
          <p className="note">{`${video.views} views`}</p>
          <p className="note">{new Date(video.uploadDate).toLocaleDateString()}</p>
          {videoTags()}
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

  useEffect(() => {
    if (!video) {
      const timer = setTimeout(() => {
        setShowNotFound(true);
      }, 3000); // Delay of 3000 milliseconds (3 seconds)

      // Cleanup the timer if the component unmounts or if video changes
      return () => clearTimeout(timer);
    } else {
      setShowNotFound(false);
    }
  }, [video]);

  if (showNotFound) {
    return <NotFoundRoute />;
  }

  return (
    video && (
      <div className="watch-video-container">
        <div className="main-video-section">
          <SharePopup isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
          {videoSection}
          <div className="video-details">{<CommentsSection videoId={videoId} currentUser={currentUser} />}</div>
        </div>
        <div className="suggested-videos-section">
          <SuggestedVideos videoId={videoId} />
        </div>
      </div>
    )
  );
};

export default WatchVideo;
