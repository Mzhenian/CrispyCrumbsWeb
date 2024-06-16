import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ProfilePhoto from "../../components/profilePhoto/ProfilePhoto";
import "./VideoList.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { VideoContext } from "../../contexts/VideoContext";
import { AuthContext } from "../../contexts/AuthContext";
import GenericButton from "../../components/buttons/GenericButton";

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const { videos, getUserById } = useContext(VideoContext);
  const { currentUser } = useContext(AuthContext);
  const [sortOption, setSortOption] = useState("most-watched");

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const sortedVideos = () => {
    let sorted = [...videos];
    switch (sortOption) {
      case "most-watched":
        sorted.sort((a, b) => b.views - a.views);
        break;
      case "subscribed":
        if (currentUser) {
          sorted = sorted.filter((video) => currentUser.following.includes(video.userId));
        } else {
          sorted = [];
        }
        break;
      case "date":
        sorted.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
        break;
      default:
        break;
    }
    return sorted;
  };

  const videosList = (
    <div className={`watch-home-video-section ${theme}`}>
      {sortedVideos().map((video) => {
        const author = getUserById(video.userId);
        return (
          <Link to={`/watch/${video.videoId}`} key={video.videoId} className={`home-video-card ${theme}`}>
            <div className="thumbnail-container">
              <img src={video.thumbnail} alt={video.title} className="home-video-thumbnail" />
            </div>
            <div className="home-video-b">
              <div className="home-video-details">
                <Link to={`/crumb/${author.userId}`}>
                  <ProfilePhoto profilePhoto={author.profilePhoto} userName={author.userName} />
                </Link>
                <div className="home-video-info">
                  <p className="home-video-title">{video.title}</p>
                  <Link to={`/crumb/${author.userId}`}>
                    <p className="note">{author.userName}</p>
                  </Link>

                  <p className="note">{video.views} views</p>
                  <p className="note">{new Date(video.uploadDate).toLocaleDateString()}</p>
                </div>
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
        {currentUser && <GenericButton text="Subscribed" onClick={() => handleSortChange("subscribed")} />}
        <GenericButton text="Must delicious" onClick={() => handleSortChange("most-watched")} />
        <GenericButton text="Hot food" onClick={() => handleSortChange("date")} />
      </div>
      {videosList}
    </div>
  );
};

export default Home;
