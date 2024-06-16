import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { VideoContext } from "../../../contexts/VideoContext";
import GenericButton from "../../../components/buttons/GenericButton";
import "../../home/VideoList.css";

const VideoList = ({ userId }) => {
  const { theme } = useContext(ThemeContext);
  const { videos } = useContext(VideoContext);
  const [sortOption, setSortOption] = useState("newest");
  const [userVideos, setUserVideos] = useState([]);

  useEffect(() => {
    const userSpecificVideos = videos.filter((video) => video.userId === userId);
    setUserVideos(userSpecificVideos);
  }, [videos, userId]);

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const sortedVideos = () => {
    let sorted = [...userVideos];
    switch (sortOption) {
      case "most-watched":
        sorted.sort((a, b) => b.views - a.views);
        break;
      case "newest":
        sorted.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
        break;
      default:
        break;
    }
    return sorted;
  };

  const videosList = (
    <div className={`watch-user-profile-video-section ${theme}`}>
      {sortedVideos().map((video) => {
        return (
          <Link to={`/watch/${video.videoId}`} key={video.videoId} className={`user-profile-video-card ${theme}`}>
            <div className="thumbnail-container">
              <img src={video.thumbnail} alt={video.title} className="user-profile-video-thumbnail" />
            </div>
            <div className="user-profile-video-details">
              <div className="user-profile-video-info">
                <p className="user-profile-video-title">{video.title}</p>
                <p className="note">{video.views} views</p>
                <p className="note">{new Date(video.uploadDate).toLocaleDateString()}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );

  return (
    <div>
      <div className="sorting-filtering-options">
        <GenericButton text="Newest" onClick={() => handleSortChange("newest")} />
        <GenericButton text="Most Watched" onClick={() => handleSortChange("most-watched")} />
      </div>
      {videosList}
    </div>
  );
};

export default VideoList;