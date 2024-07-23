import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfilePhoto from "../../components/profilePhoto/ProfilePhoto";
import "./VideoList.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { VideoContext } from "../../contexts/VideoContext";
import { AuthContext } from "../../contexts/AuthContext";
import GenericButton from "../../components/buttons/GenericButton";
import VideoThumbnail from "../../components/videoThumbnail/VideoThumbnail";

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const { videos, fetchVideos } = useContext(VideoContext);
  const { currentUser, getUserById } = useContext(AuthContext);
  const [sortOption, setSortOption] = useState("most-watched");
  const [videoAuthors, setVideoAuthors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  useEffect(() => {
    const fetchAuthors = async () => {
      const authorPromises = videos.map(async (video) => {
        const author = await getUserById(video.userId.toString());
        return { [video._id.toString()]: author };
      });
      const authors = await Promise.all(authorPromises);
      const authorsMap = authors.reduce((acc, author) => ({ ...acc, ...author }), {});
      setVideoAuthors(authorsMap);
    };

    if (videos.length > 0) {
      fetchAuthors();
    }
  }, [videos, getUserById]);

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
        const author = videoAuthors[video._id.toString()];
        return author ? (
          <div key={video._id.toString()} className={`home-video-card ${theme}`}>
            <Link to={`/watch/${video._id.toString()}`} className="thumbnail-link">
              <VideoThumbnail video={video} />
            </Link>
            <div className="home-video-b">
              <div className="home-video-details">
                <ProfilePhoto user={author} clickable={true} />
                <div className="home-video-info">
                  <Link to={`/watch/${video._id.toString()}`} className="title-link">
                    <p className="home-video-title">{video.title}</p>
                  </Link>
                  <div className="author-link" onClick={(e) => handleAuthorClick(e, author._id)}>
                    <p className="note">{author.userName}</p>
                  </div>
                  <p className="note">{`${video.views} views`} </p>
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
