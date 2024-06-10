import React, { useContext } from "react";
import { Link } from "react-router-dom";
import videoDB from "../../DB/videosDB.json";
import "./home.css";
import { ThemeContext } from "../../ThemeContext";

const Home = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`watch-video-section ${theme}`}>
      {videoDB.videos.map((video) => (
        <Link to={`/watch/${video.videoId}`} key={video.videoId} className={`video-card ${theme}`}>
          <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
          <div className="video-details">
            <p className="video-title">{video.title}</p>
            <p className="note">{video.views} views</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;
