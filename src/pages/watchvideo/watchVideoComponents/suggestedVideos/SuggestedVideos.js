import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import { VideoContext } from "../../../../contexts/VideoContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import VideoList from "../../../../components/videosList/VideosList";


const SuggestedVideos = () => {
  const { theme } = useContext(ThemeContext);
  const { videos, fetchVideos } = useContext(VideoContext);
  const { getUserBasicById } = useContext(AuthContext);
  const [videoAuthors, setVideoAuthors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthors = async () => {
      const authorPromises = videos.randomVideos.map(async (video) => {
        const author = await getUserBasicById(video.userId);
        return { [video._id.toString()]: author };
      });
      const authors = await Promise.all(authorPromises);
      const authorsMap = authors.reduce((acc, author) => ({ ...acc, ...author }), {});
      setVideoAuthors(authorsMap);
    };

    if (videos.randomVideos.length > 0) {
      fetchAuthors();
    }
  }, [videos, getUserBasicById]);

  const handleAuthorClick = (e, profileId) => {
    e.stopPropagation();
    navigate(`/crumb/${profileId}`);
  };

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return (
    <VideoList
      videos={videos.randomVideos.slice(0, 10)}
      videoAuthors={videoAuthors}
      handleAuthorClick={handleAuthorClick}
      theme={theme}
      showView="list"
      displayProfileImage={false}
    />
  );
};

export default SuggestedVideos;
