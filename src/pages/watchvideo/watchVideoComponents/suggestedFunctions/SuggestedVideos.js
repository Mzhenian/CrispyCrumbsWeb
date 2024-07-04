import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./suggestedVideos.css";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import { VideoContext } from "../../../../contexts/VideoContext";
import { AuthContext } from "../../../../contexts/AuthContext";

const SuggestedVideos = () => {
  const { theme } = useContext(ThemeContext);
  const { videos } = useContext(VideoContext);
  const { getUserById } = useContext(AuthContext);
  const [videoAuthors, setVideoAuthors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthors = async () => {
      const authorPromises = videos.map(async (video) => {
        const author = await getUserById(video.userId);
        return { [video.videoId]: author };
      });
      const authors = await Promise.all(authorPromises);
      const authorsMap = authors.reduce((acc, author) => ({ ...acc, ...author }), {});
      setVideoAuthors(authorsMap);
    };

    if (videos.length > 0) {
      fetchAuthors();
    }
  }, [videos]);

  const handleAuthorClick = (e, profileId) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/crumb/${profileId}`);
  };

  return (
    <div className={`watch-suggested-video-section ${theme}`}>
      {videos.slice(0, 17).map((video) => {
        const author = videoAuthors[video.videoId];
        return author ? (
          <Link to={`/watch/${video.videoId}`} key={video.videoId} className={`suggested-video-card ${theme}`}>
            <img src={video.thumbnail} alt={video.title} className="suggested-video-thumbnail" />
            <div className="suggested-video-details">
              <p className="suggested-video-title">{video.title}</p>
              <p className="note author-link" onClick={(e) => handleAuthorClick(e, author.userId)}>
                {author.userName}
              </p>
              <p className="note">{video.views} views</p>
            </div>
          </Link>
        ) : null;
      })}
    </div>
  );
};

export default SuggestedVideos;
