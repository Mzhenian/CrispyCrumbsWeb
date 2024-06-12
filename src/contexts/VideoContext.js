import React, { createContext, useState } from "react";
import videoDB from "../DB/videosDB.json";
import usersDB from "../DB/usersDB.json";

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState(videoDB.videos);
  const [users, setUsers] = useState(usersDB.users);

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

  return (
    <VideoContext.Provider
      value={{
        videos,
        users,
        getVideoById,
        getUserById,
        editVideo,
        uploadVideo,
        likeVideo,
        dislikeVideo,
        addComment,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export { VideoContext, VideoProvider };
