import React, { createContext, useState, useEffect } from "react";
//import { AuthContext } from "./AuthContext";

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  //const { currentUser } = useContext(AuthContext);
  const apiVideosUrl = `${process.env.REACT_APP_API_URL}/api/videos`;
  const apiUsersUrl = `${process.env.REACT_APP_API_URL}/api/users`;

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

  const fetchAllVideos = async () => {
    try {
      const response = await fetch(apiVideosUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error("Error fetching all videos:", error);
    }
  };
  

  const getVideosByUserId = async (userId) => {
    try {
      const response = await fetch(`${apiUsersUrl}/${userId}/videos/`, {
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
      console.error("Get videos by user ID failed:", err);
      return null;
    }
  };

  const editVideo = async (videoId, updatedVideo) => {};

  const uploadVideo = async (token, videoData, userId) => {
    try {
      const response = await fetch(`${apiUsersUrl}/${parseInt(userId)}/videos`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: videoData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message || "An error occurred while uploading the video.");
    }
  };

  const likeVideo = async (videoId, userId) => {
    try {
      const response = await fetch(`${apiVideosUrl}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoId, userId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error liking video:", error);
    }
  };
  
  const dislikeVideo = async (videoId, userId) => {
    try {
      const response = await fetch(`${apiVideosUrl}/dislike`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoId, userId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error disliking video:", error);
    }
  };
   
  const addComment = async (videoId, comment) => {
    try {
      const response = await fetch(`${apiVideosUrl}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoId, userId: comment.userId, commentText: comment.comment, date: new Date().toISOString() }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  
  
  
  
  const editComment = async (videoId, comment) => {
    try {
      const response = await fetch(`${apiVideosUrl}/comment`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoId, ...comment }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };
  
  const deleteComment = async (videoId, commentId, userId) => {
    try {
      const response = await fetch(`${apiVideosUrl}/comment`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoId, commentId, userId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  
  const deleteVideo = async (videoId) => {};

  const incrementViews = async (videoId) => {
    try {
      const response = await fetch(`${apiVideosUrl}/incrementViews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error incrementing views:", error);
    }
  };
  

  return (
    <VideoContext.Provider
      value={{
        apiUrl: apiVideosUrl,
        videos,
        getVideoById,
        getVideosByUserId,
        fetchAllVideos,
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
