import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ProfilePhoto from "../../components/profilePhoto/ProfilePhoto";
import "./home.css";
import { ThemeContext } from "../../ThemeContext";
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
            <img src={video.thumbnail} alt={video.title} className="home-video-thumbnail" />
            <div className="home-video-b">
              <div className="home-video-details">
                <p className="home-video-title">{video.title}</p>
                <div className="home-video-info">
                  <ProfilePhoto profilePhoto={author.profilePhoto} userName={author.userName} />
                  <p className="home-video-author">{author.userName}</p>
                </div>
                <p className="note">{video.views} views</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Home;
