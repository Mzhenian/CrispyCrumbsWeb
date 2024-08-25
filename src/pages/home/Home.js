// Home.js
import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { VideoContext } from "../../contexts/VideoContext";
import { AuthContext } from "../../contexts/AuthContext";
import VideoList from "../../components/videosList/VideosList";
import SortingOptions from "./SortingOptions";

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const { videos, fetchVideos, fetchFollowersVideos, getVideoBySearch } = useContext(VideoContext);
  const { currentUser, getUserBasicById } = useContext(AuthContext);
  const [sortOption, setSortOption] = useState("most-watched");
  const [videoAuthors, setVideoAuthors] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchVideos();
    fetchFollowersVideos();
  }, [fetchVideos, fetchFollowersVideos]);

  useEffect(() => {
    const fetchAuthors = async () => {
      const videoList = [
        ...videos.mostViewedVideos,
        ...videos.mostRecentVideos,
        ...videos.followingVideos,
        ...videos.randomVideos,
        ...searchResults,
      ];

      const authorPromises = videoList.map(async (video) => {
        const author = await getUserBasicById(video.userId.toString());
        return { [video._id.toString()]: author };
      });

      const authors = await Promise.all(authorPromises);
      const authorsMap = authors.reduce((acc, author) => ({ ...acc, ...author }), {});
      setVideoAuthors(authorsMap);
    };

    if (videos.mostViewedVideos.length > 0 || searchResults.length > 0) {
      fetchAuthors();
    }
  }, [videos, searchResults, getUserBasicById]);

  useEffect(() => {
    const query = new URLSearchParams(location.search).get("search");
    if (query) {
      getVideoBySearch(query).then((results) => {
        setSearchResults(results);
        setSortOption("search-results");
      });
    } else {
      setSortOption("random");
    }
  }, [location.search, getVideoBySearch]);

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const handleAuthorClick = (e, profileId) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/crumb/${profileId}`);
  };

  const sortedVideos = () => {
    switch (sortOption) {
      case "search-results":
        return searchResults;
      case "most-watched":
        return videos.mostViewedVideos;
      case "most-recent":
        return videos.mostRecentVideos;
      case "subscribed":
        return currentUser ? videos.followingVideos : [];
      default:
        return videos.randomVideos;
    }
  };

  return (
    <div>
      <VideoList
        videos={sortedVideos()}
        videoAuthors={videoAuthors}
        handleAuthorClick={handleAuthorClick}
        theme={theme}
        sortOptions={<SortingOptions currentUser={currentUser} handleSortChange={handleSortChange} />}
      />
    </div>
  );
};

export default Home;
