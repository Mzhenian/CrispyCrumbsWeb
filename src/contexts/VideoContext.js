import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const apiUrl = `${process.env.REACT_APP_API_URL}/api/videos`;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setVideos(data);
      } catch (err) {
        console.error("Fetch videos failed:", err);
      }
    };
    fetchVideos();
  }, [apiUrl]);

  const getVideoById = async (videoId) => {
    try {
      const response = await fetch(`${apiUrl}/${videoId}`, {
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

  const editVideo = async (videoId, updatedVideo) => {
    try {
      const response = await fetch(`${apiUrl}/edit/${videoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedVideo),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setVideos((prevVideos) => prevVideos.map((video) => (video._id === videoId ? data : video)));
    } catch (err) {
      console.error("Edit video failed:", err);
    }
  };

  const uploadVideo = async (newVideo) => {
    try {
      const response = await fetch(`${apiUrl}/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVideo),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setVideos((prevVideos) => [data, ...prevVideos]);
    } catch (err) {
      console.error("Upload video failed:", err);
    }
  };

  const likeVideo = async (videoId) => {
    if (!currentUser) return;
    try {
      const response = await fetch(`${apiUrl}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoId, userId: currentUser._id }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setVideos((prevVideos) => prevVideos.map((video) => (video._id === videoId ? data : video)));
    } catch (err) {
      console.error("Like video failed:", err);
    }
  };

  const dislikeVideo = async (videoId) => {
    if (!currentUser) return;
    try {
      const response = await fetch(`${apiUrl}/dislike`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoId, userId: currentUser._id }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setVideos((prevVideos) => prevVideos.map((video) => (video._id === videoId ? data : video)));
    } catch (err) {
      console.error("Dislike video failed:", err);
    }
  };

  const addComment = async (videoId, comment) => {
    try {
      const response = await fetch(`${apiUrl}/comment/add${videoId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoId, comment }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setVideos((prevVideos) => prevVideos.map((video) => (video._id === videoId ? data : video)));
    } catch (err) {
      console.error("Add comment failed:", err);
    }
  };

  const editComment = async (videoId, updatedComment) => {
    try {
      const response = await fetch(`${apiUrl}/comment/edit${videoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoId, updatedComment }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setVideos((prevVideos) =>
        prevVideos.map((video) => (video._id === videoId ? { ...video, comments: data.comments } : video))
      );
    } catch (err) {
      console.error("Edit comment failed:", err);
    }
  };

  const deleteComment = async (videoId, commentId) => {
    try {
      const response = await fetch(`${apiUrl}/comment/delete${videoId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoId, commentId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setVideos((prevVideos) =>
        prevVideos.map((video) => (video._id === videoId ? { ...video, comments: data.comments } : video))
      );
    } catch (err) {
      console.error("Delete comment failed:", err);
    }
  };

  const deleteVideo = async (videoId) => {
    try {
      const response = await fetch(`${apiUrl}/delete/${videoId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setVideos((prevVideos) => prevVideos.filter((video) => video._id !== videoId));
    } catch (err) {
      console.error("Delete video failed:", err);
    }
  };

  const incrementViews = async (videoId) => {
    try {
      const response = await fetch(`${apiUrl}/views/${videoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setVideos((prevVideos) => prevVideos.map((video) => (video._id === videoId ? data : video)));
    } catch (err) {
      console.error("Increment views failed:", err);
    }
  };

  return (
    <VideoContext.Provider
      value={{
        apiUrl,
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
