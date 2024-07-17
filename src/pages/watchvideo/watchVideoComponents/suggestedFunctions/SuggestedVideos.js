import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./suggestedVideos.css";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import { VideoContext } from "../../../../contexts/VideoContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import defaultVideoThumbnail from "../../../../components/iconsLab/defaultVideoThumbnail.png";

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

  const handleAuthorClick = (e, profileId) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/crumb/${profileId}`);
  };

  return (
    <div className={`watch-suggested-video-section ${theme}`}>
      {videos.slice(0, 17).map((video) => {
        const author = videoAuthors[video._id];
        const thumbnailUrl = video.thumbnail
          ? `${process.env.REACT_APP_API_URL}/api/db${video.thumbnail}`
          : defaultVideoThumbnail;

        return author ? (
          <Link to={`/watch/${video._id}`} key={video._id} className={`suggested-video-card ${theme}`}>
            <img src={thumbnailUrl} alt={video.title} className="suggested-video-thumbnail" />
            <div className="suggested-video-details">
              <p className="suggested-video-title">{video.title}</p>
              <p className="note author-link" onClick={(e) => handleAuthorClick(e, author._id.toString())}>
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
