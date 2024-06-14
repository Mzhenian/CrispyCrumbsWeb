import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ProfilePhoto from "../../components/profilePhoto/ProfilePhoto";
import "./Home.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { VideoContext } from "../../contexts/VideoContext";

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const { videos, getUserById } = useContext(VideoContext);

  return (
    <div className={`watch-home-video-section ${theme}`}>
      {videos.map((video) => {
        const author = getUserById(video.userId);
        return (
          <Link to={`/watch/${video.videoId}`} key={video.videoId} className={`home-video-card ${theme}`}>
            <div className="thumbnail-container">
              <img src={video.thumbnail} alt={video.title} className="home-video-thumbnail" />
            </div>
            <div className="home-video-b">
              <div className="home-video-details">
                <ProfilePhoto profilePhoto={author.profilePhoto} userName={author.userName} />
                <div className="home-video-info">
                  <p className="home-video-title">{video.title}</p>

                  <p className="note">{author.userName}</p>
                  <p className="note">{video.views} views</p>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Home;
