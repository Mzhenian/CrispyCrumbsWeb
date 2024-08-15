import React, { createContext, useState, useEffect, useCallback, useContext } from "react";
import { AuthContext } from "./AuthContext";

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [videos, setVideos] = useState({
    mostViewedVideos: [],
    mostRecentVideos: [],
    followingVideos: [],
    randomVideos: [],
    // searchResultVideos: [],
  });

  const apiVideosUrl = `${process.env.REACT_APP_API_URL}/api/videos`;
  const apiUsersUrl = `${process.env.REACT_APP_API_URL}/api/users`;

  const fetchVideos = useCallback(async () => {
    try {
      const response = await fetch(apiVideosUrl, {
        headers: {},
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setVideos((prevVideos) => ({
        ...prevVideos,
        mostViewedVideos: data.mostViewedVideos || [],
        mostRecentVideos: data.mostRecentVideos || [],
        randomVideos: data.randomVideos || [],
      }));
    } catch (err) {
      console.error("Fetch videos failed:", err);
    }
  }, [apiVideosUrl]);

  const fetchFollowersVideos = useCallback(async () => {
    try {
      const response = await fetch(`${apiVideosUrl}/followers`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setVideos((prevVideos) => ({
        ...prevVideos,
        followingVideos: data || [],
      }));
    } catch (err) {
      console.error("Fetch followers videos failed:", err);
    }
  }, [apiVideosUrl, currentUser]);

  useEffect(() => {
    fetchVideos();
    if (currentUser) {
      fetchFollowersVideos();
    }
  }, [fetchVideos, fetchFollowersVideos, currentUser]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

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

  const getVideosByUserId = async (userId) => {
    try {
      const response = await fetch(`${apiUsersUrl}/${userId}/videos`, {
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

  const getVideoBySearch = async (query) => {
    try {
      const response = await fetch(`${apiVideosUrl}/search/${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 404) {
        throw new Error(`No video found. status: ${response.status}`);
      } else if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("search videos failed:", err);
      return [];
    }
  }

  const uploadVideo = async (token, videoData, userId) => {
    try {
      const response = await fetch(`${apiUsersUrl}/${userId}/videos`, {
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
      fetchVideos(); // Fetch videos after uploading a new video
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
          Authorization: `Bearer ${currentUser.token}`,
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
          Authorization: `Bearer ${currentUser.token}`,
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
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify({
          videoId,
          userId: currentUser._id,
          commentText: comment.comment,
          date: new Date().toISOString(),
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newComment = await response.json();
      return newComment;
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
          Authorization: `Bearer ${currentUser.token}`,
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
          Authorization: `Bearer ${currentUser.token}`,
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

  const editVideo = async (userId, videoId, updatedVideo, token) => {
    try {
      const response = await fetch(`${apiUsersUrl}/${userId}/videos/${videoId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: updatedVideo,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setVideos((prevVideos) => {
        const updatedMostViewedVideos = prevVideos.mostViewedVideos.map((video) =>
          video._id === videoId ? data : video
        );
        const updatedMostRecentVideos = prevVideos.mostRecentVideos.map((video) =>
          video._id === videoId ? data : video
        );
        const updatedFollowingVideos = prevVideos.followingVideos.map((video) =>
          video._id === videoId ? data : video
        );
        const updatedRandomVideos = prevVideos.randomVideos.map((video) => (video._id === videoId ? data : video));

        return {
          ...prevVideos,
          mostViewedVideos: updatedMostViewedVideos,
          mostRecentVideos: updatedMostRecentVideos,
          followingVideos: updatedFollowingVideos,
          randomVideos: updatedRandomVideos,
        };
      });
      return data;
    } catch (error) {
      console.error("Error editing video:", error);
    }
  };

  const deleteVideo = async (videoId, token) => {
    try {
      const response = await fetch(`${apiVideosUrl}/${videoId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setVideos((prevVideos) => {
        const updatedMostViewedVideos = prevVideos.mostViewedVideos.filter((video) => video._id !== videoId);
        const updatedMostRecentVideos = prevVideos.mostRecentVideos.filter((video) => video._id !== videoId);
        const updatedFollowingVideos = prevVideos.followingVideos.filter((video) => video._id !== videoId);
        const updatedRandomVideos = prevVideos.randomVideos.filter((video) => video._id !== videoId);

        return {
          ...prevVideos,
          mostViewedVideos: updatedMostViewedVideos,
          mostRecentVideos: updatedMostRecentVideos,
          followingVideos: updatedFollowingVideos,
          randomVideos: updatedRandomVideos,
        };
      });
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  return (
    <VideoContext.Provider
      value={{
        apiUrl: apiVideosUrl,
        videos,
        fetchVideos,
        fetchFollowersVideos,
        getVideoById,
        getVideosByUserId,
        getVideoBySearch,
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
