import React, { createContext, useState, useEffect } from "react";
//import { AuthContext } from "./AuthContext";

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  //const { currentUser } = useContext(AuthContext);
  const apiVideosUrl = `${process.env.REACT_APP_API_URL}/api/videos`;

  useEffect(() => {
    let isMounted = true; // flag to indicate if the component is mounted
    const fetchVideos = async () => {
      try {
        const response = await fetch(apiVideosUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (isMounted) {
          setVideos(data);
        }
      } catch (err) {
        if (isMounted) console.error("Fetch videos failed:", err);
      }
    };
    fetchVideos();
    return () => {
      isMounted = false; // cleanup function to set isMounted to false when the component unmounts
    };
  }, [apiVideosUrl]);

  const getVideoById = async (videoId) => {
    try {
      const response = await fetch(`${apiVideosUrl}/${videoId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Get video by ID failed:", err);
      return null;
    }
  };

  const editVideo = async (videoId, updatedVideo) => {};

  const uploadVideo = async (newVideo) => {};

  const likeVideo = async (videoId) => {};

  const dislikeVideo = async (videoId) => {};

  const addComment = async (videoId, comment) => {};

  const editComment = async (videoId, updatedComment) => {};

  const deleteComment = async (videoId, commentId) => {};

  const deleteVideo = async (videoId) => {};

  const incrementViews = async (videoId) => {};

  return (
    <VideoContext.Provider
      value={{
        apiUrl: apiVideosUrl,
        videos,
        getVideoById,
        editVideo,
        uploadVideo,
        likeVideo,
        dislikeVideo,
        addComment,
        editComment,
        deleteComment,
        deleteVideo,
        incrementViews,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export { VideoContext, VideoProvider };
