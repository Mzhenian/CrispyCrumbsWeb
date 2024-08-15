import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ProfilePhoto from "../../components/profilePhoto/ProfilePhoto";
import "./VideoList.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import { VideoContext } from "../../contexts/VideoContext";
import { AuthContext } from "../../contexts/AuthContext";
import GenericButton from "../../components/buttons/GenericButton";
import VideoThumbnail from "../../components/videoThumbnail/VideoThumbnail";
import sad404 from "../../components/iconsLab/notFound.svg";

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const { videos, fetchVideos, fetchFollowersVideos, getVideoBySearch } =
    useContext(VideoContext);
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
      const authorsMap = authors.reduce(
        (acc, author) => ({ ...acc, ...author }),
        {}
      );
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

  const videosList =
    sortedVideos().length > 0 ? (
      <div className={`watch-home-video-section ${theme}`}>
        {sortedVideos().map((video) => {
          const author = videoAuthors[video._id.toString()];
          return author ? (
            <div
              key={video._id.toString()}
              className={`home-video-card ${theme}`}
            >
              <Link
                to={`/watch/${video._id.toString()}`}
                className="thumbnail-link"
              >
                <VideoThumbnail video={video} />
              </Link>
              <div className="home-video-b">
                <div className="home-video-details">
                  <ProfilePhoto user={author} clickable={true} />
                  <div className="home-video-info">
                    <Link
                      to={`/watch/${video._id.toString()}`}
                      className="title-link"
                    >
                      <p className="home-video-title">{video.title}</p>
                    </Link>
                    <div
                      className="author-link"
                      onClick={(e) => handleAuthorClick(e, author._id)}
                    >
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
    ) : (
      <div className="no-videos-found">
        <h1>No videos found</h1>
        <img src={sad404} alt="not-found" />
      </div>
    );

  return (
    <div>
      <div className="sorting-filtering-options">
        {currentUser && (
          <GenericButton
            text="Subscribed"
            onClick={() => handleSortChange("subscribed")}
          />
        )}
        <GenericButton
          text="Most Watched"
          onClick={() => handleSortChange("most-watched")}
        />
        <GenericButton
          text="Most Recent"
          onClick={() => handleSortChange("most-recent")}
        />
        <GenericButton
          text="Suggested for you"
          onClick={() => handleSortChange("random")}
        />
      </div>
        { videosList }
    </div>
  );
};

export default Home;
