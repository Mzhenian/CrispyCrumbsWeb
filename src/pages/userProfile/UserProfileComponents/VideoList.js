import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfilePhoto from "../../../components/profilePhoto/ProfilePhoto";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { VideoContext } from "../../../contexts/VideoContext";
import { AuthContext } from "../../../contexts/AuthContext";
import GenericButton from "../../../components/buttons/GenericButton";
import VideoThumbnail from "../../../components/videoThumbnail/VideoThumbnail";
import editIcon from "../../../components/iconsLab/edit.svg";

const VideoList = ({ userId }) => {
  const { theme } = useContext(ThemeContext);
  const { getVideosByUserId } = useContext(VideoContext);
  const { currentUser, getUserById } = useContext(AuthContext);
  const [sortOption, setSortOption] = useState("newest");
  const [userVideos, setUserVideos] = useState([]);
  const [videoAuthors, setVideoAuthors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videos = await getVideosByUserId(userId);
        if (videos) {
          setUserVideos(videos);

          const authorPromises = videos.map(async (video) => {
            const author = await getUserById(video.userId);
            return { [video.videoId]: author };
          });

          const authors = await Promise.all(authorPromises);
          const authorsMap = authors.reduce((acc, author) => ({ ...acc, ...author }), {});
          setVideoAuthors(authorsMap);
        }
      } catch (error) {
        console.error("Failed to fetch videos and authors:", error);
      }
    };

    fetchVideos();
  }, [userId, getVideosByUserId, getUserById]);

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const handleAuthorClick = (e, profileId) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/crumb/${profileId}`);
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
        const author = videoAuthors[video.videoId];
        return author ? (
          <div key={video.videoId} className={`user-profile-video-card ${theme}`}>
            <Link to={`/watch/${video.videoId}`} className="no-link-style">
              <VideoThumbnail video={video} />
              <div>
                <div className="user-profile-video-details">
                  <div className="user-profile-video-info">
                    <p className="user-profile-video-title">{video.title}</p>
                    <p className="note">{video.views} views</p>
                    <p className="note">{new Date(video.uploadDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </Link>
            <div className="video-list-edit-icon">
              {currentUser && currentUser.userId === userId && (
                <GenericButton icon={editIcon} link={`/edit/${video.videoId}`} />
              )}
            </div>
          </div>
        ) : null;
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
