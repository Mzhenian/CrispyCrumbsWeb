import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./suggestedVideos.css";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import { VideoContext } from "../../../../contexts/VideoContext";

const SuggestedVideos = () => {
  const { theme } = useContext(ThemeContext);
  const { videos, getUserById } = useContext(VideoContext);

  return (
    <div className={`watch-suggested-video-section ${theme}`}>
      {videos.slice(0, 17).map((video) => {
        const author = getUserById(video.userId);
        return (
          <Link to={`/watch/${video.videoId}`} key={video.videoId} className={`suggested-video-card ${theme}`}>
            <img src={video.thumbnail} alt={video.title} className="suggested-video-thumbnail" />
            <div className="suggested-video-details">
              <p className="suggested-video-title">{video.title}</p>
              <Link to={`/crumb/${author.userId}`}>
                <p className="note">{author.userName} </p>
              </Link>
              <p className="note">{video.views} views</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default SuggestedVideos;
