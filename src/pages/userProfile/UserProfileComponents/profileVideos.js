import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { VideoContext } from "../../../contexts/VideoContext";
import { AuthContext } from "../../../contexts/AuthContext";
import GenericButton from "../../../components/buttons/GenericButton";
import VideoList from "../../../components/videosList/VideosList";

const ProfileVideos = ({ userId }) => {
  const { theme } = useContext(ThemeContext);
  const { getVideosByUserId } = useContext(VideoContext);
  const { currentUser } = useContext(AuthContext);
  const [sortOption, setSortOption] = useState("newest");
  const [userVideos, setUserVideos] = useState([]);
  const [videoAuthors] = useState({});

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

  console.log(sortedVideos());

  const sortOptions = (
    <div className="sorting-filtering-options">
      <GenericButton text="Newest" onClick={() => handleSortChange("newest")} />
      <GenericButton text="Most Watched" onClick={() => handleSortChange("most-watched")} />
    </div>
  );

  return (
    <div className="videoProfileContainer">
      <VideoList
        videos={sortedVideos()}
        videoAuthors={videoAuthors}
        handleAuthorClick={() => {}}
        theme={theme}
        sortOptions={sortOptions}
        isProfile={true}
        editVideo={currentUser && currentUser._id && currentUser._id.toString() === userId}
      />
    </div>
  );
};

export default ProfileVideos;
