import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { VideoContext } from "../../contexts/VideoContext";
import { AuthContext } from "../../contexts/AuthContext";
import VideoList from "../../components/videosList/VideosList";

const Search = () => {
  const { theme } = useContext(ThemeContext);
  const { getVideoBySearch } = useContext(VideoContext);
  const { getUserBasicById } = useContext(AuthContext);
  const [searchResults, setSearchResults] = useState([]);
  const [videoAuthors, setVideoAuthors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("search");
    if (query) {
      getVideoBySearch(query).then((results) => {
        setSearchResults(results);
      });
    }
  }, [location.search, getVideoBySearch]);

  useEffect(() => {
    const fetchAuthors = async () => {
      const authorPromises = searchResults.map(async (video) => {
        const author = await getUserBasicById(video.userId.toString());
        return { [video._id.toString()]: author };
      });

      const authors = await Promise.all(authorPromises);
      const authorsMap = authors.reduce((acc, author) => ({ ...acc, ...author }), {});
      setVideoAuthors(authorsMap);
    };

    if (searchResults.length > 0) {
      fetchAuthors();
    }
  }, [searchResults, getUserBasicById]);

  const handleAuthorClick = (e, profileId) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/crumb/${profileId}`);
  };

  return (
    <div className="video-list-container">
      <VideoList
        videos={searchResults}
        videoAuthors={videoAuthors}
        handleAuthorClick={handleAuthorClick}
        theme={theme}
        sortOptions={null}
        showView="list"
      />
    </div>
  );
};

export default Search;
