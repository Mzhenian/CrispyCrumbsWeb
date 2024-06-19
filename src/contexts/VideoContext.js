import React, { createContext, useState, useContext } from "react";
import videoDB from "../DB/videosDB.json";
import { AuthContext } from "./AuthContext";

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const { users } = useContext(AuthContext);
  const [videos, setVideos] = useState(videoDB.videos);

  const getVideoById = (videoId) => videos.find((video) => video.videoId === videoId);
  const getUserById = (userId) => users.find((user) => user.userId === userId);

  const editVideo = (videoId, updatedVideo) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) => (video.videoId === videoId ? { ...video, ...updatedVideo } : video))
    );
  };

  const uploadVideo = (newVideo) => {
    setVideos((prevVideos) => [newVideo, ...prevVideos]);
  };

  const likeVideo = (videoId, userId) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) => {
        if (video.videoId === videoId) {
          const liked = video.likedBy.includes(userId);
          const disliked = video.dislikedBy.includes(userId);

          if (liked) {
            return {
              ...video,
              likes: video.likes - 1,
              likedBy: video.likedBy.filter((id) => id !== userId),
            };
          } else {
            return {
              ...video,
              likes: video.likes + 1,
              dislikes: disliked ? video.dislikes - 1 : video.dislikes,
              likedBy: [...video.likedBy, userId],
              dislikedBy: video.dislikedBy.filter((id) => id !== userId),
            };
          }
        }
        return video;
      })
    );
  };

  const dislikeVideo = (videoId, userId) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) => {
        if (video.videoId === videoId) {
          const liked = video.likedBy.includes(userId);
          const disliked = video.dislikedBy.includes(userId);

          if (disliked) {
            return {
              ...video,
              dislikes: video.dislikes - 1,
              dislikedBy: video.dislikedBy.filter((id) => id !== userId),
            };
          } else {
            return {
              ...video,
              dislikes: video.dislikes + 1,
              likes: liked ? video.likes - 1 : video.likes,
              dislikedBy: [...video.dislikedBy, userId],
              likedBy: video.likedBy.filter((id) => id !== userId),
            };
          }
        }
        return video;
      })
    );
  };

  const addComment = (videoId, comment) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.videoId === videoId ? { ...video, comments: [comment, ...video.comments] } : video
      )
    );
  };

  const editComment = (videoId, updatedComment) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.videoId === videoId
          ? {
              ...video,
              comments: video.comments.map((comment) =>
                comment.commentId === updatedComment.commentId ? updatedComment : comment
              ),
            }
          : video
      )
    );
  };

  const incrementViews = (videoId) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) => (video.videoId === videoId ? { ...video, views: video.views + 1 } : video))
    );
  };

  return (
    <VideoContext.Provider
      value={{
        videos,
        getVideoById,
        getUserById,
        editVideo,
        uploadVideo,
        likeVideo,
        dislikeVideo,
        addComment,
        editComment,
        incrementViews,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export { VideoContext, VideoProvider };
