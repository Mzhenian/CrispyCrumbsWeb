import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { VideoContext } from "../../../contexts/VideoContext";
import { AuthContext } from "../../../contexts/AuthContext";
import GenericButton from "../../../components/buttons/GenericButton";
import VideoThumbnail from "../../../components/videoThumbnail/VideoThumbnail";
import editIcon from "../../../components/iconsLab/edit.svg";

const VideoList = ({ userId }) => {
  const { theme } = useContext(ThemeContext);
  const { getVideosByUserId } = useContext(VideoContext);
  const { currentUser } = useContext(AuthContext);
  const [sortOption, setSortOption] = useState("newest");
  const [userVideos, setUserVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videos = await getVideosByUserId(userId);
        if (videos) {
          setUserVideos(videos);
        } else {
          setUserVideos([]);
        }
      } catch (error) {
        console.error("Failed to fetch videos:", error);
        setUserVideos([]);
      }
    };

    fetchVideos();
  }, [userId, getVideosByUserId]);

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const sortedVideos = () => {
    if (userVideos.length === 0) {
      return [];
    }
    let sorted = [...userVideos];
    switch (sortOption) {
      case "most-watched":
        sorted.sort((a, b) => b.views - a.views);
        break;
      case "newest":
        sorted.sort((a, b) => new Date(b.uploadDate || 0) - new Date(a.uploadDate || 0));
        break;
      default:
        break;
    }
    return sorted;
  };

  const videosList = (
    <div className={`watch-user-profile-video-section ${theme}`}>
      {sortedVideos().map((video) => (
        <div key={video._id} className={`user-profile-video-card ${theme}`}>
          <Link to={`/watch/${video._id}`} className="no-link-style">
            <VideoThumbnail video={video} />
            <div>
              <div className="user-profile-video-details">
                <div className="user-profile-video-info">
                  <p className="user-profile-video-title">{video.title}</p>
                  <p className="note">{video.views} views</p>
                  {video.uploadDate ? (
                    <p className="note">{new Date(video.uploadDate).toLocaleDateString()}</p>
                  ) : (
                    <p className="note">No upload date</p>
                  )}
                </div>
              </div>
            </div>
          </Link>
          <div className="video-list-edit-icon">
            {currentUser && currentUser._id && currentUser._id.toString() === userId && (
              <GenericButton icon={editIcon} link={`/edit/${video._id}`} />
            )}
          </div>
        </div>
      ))}
      {userVideos.length === 0 && <p className="note">No videos available.</p>}
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
