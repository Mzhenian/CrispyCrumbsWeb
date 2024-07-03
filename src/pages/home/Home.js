import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfilePhoto from "../../components/profilePhoto/ProfilePhoto";
import "./VideoList.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { VideoContext } from "../../contexts/VideoContext";
import { AuthContext } from "../../contexts/AuthContext";
import GenericButton from "../../components/buttons/GenericButton";

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const { videos } = useContext(VideoContext);
  const { currentUser } = useContext(AuthContext);
  const [sortOption, setSortOption] = useState("most-watched");
  const navigate = useNavigate();

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const handleAuthorClick = (e, profileId) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/crumb/${profileId}`);
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
        const author = video.userId;
        return author ? (
          <div key={video.videoId} className={`home-video-card ${theme}`}>
            <Link to={`/watch/${video.videoId}`} className="thumbnail-link">
              <div className="thumbnail-container">
                <img src={video.thumbnail} alt={video.title} className="home-video-thumbnail" />
              </div>
            </Link>
            <div className="home-video-b">
              <div className="home-video-details">
                <div className="author-link" onClick={(e) => handleAuthorClick(e, author.userId)}>
                  <ProfilePhoto profilePhoto={author.profilePhoto} userName={author.userName} />
                </div>
                <div className="home-video-info">
                  <Link to={`/watch/${video.videoId}`} className="title-link">
                    <p className="home-video-title">{video.title}</p>
                  </Link>
                  <div className="author-link" onClick={(e) => handleAuthorClick(e, author.userId)}>
                    <p className="note">{author.userName}</p>
                  </div>
                  <p className="note">{video.views} views</p>
                  <p className="note">{new Date(video.uploadDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null;
      })}
    </div>
  );

  return (
    <div>
      <div className="sorting-filtering-options">
        {currentUser && <GenericButton text="Subscribed" onClick={() => handleSortChange("subscribed")} />}
        <GenericButton text="Most Watched" onClick={() => handleSortChange("most-watched")} />
        <GenericButton text="Newest" onClick={() => handleSortChange("date")} />
      </div>
      {videosList}
    </div>
  );
};

export default Home;
