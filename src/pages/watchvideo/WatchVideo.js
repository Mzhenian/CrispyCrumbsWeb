import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import videoDB from "../../DB/videosDB.json";
import usersDB from "../../DB/usersDB.json";
import "./watchvideo.css";
import VideoContainer from "./watchVideoComponents/videoContainer/VideoContainer";
import LikeButton from "./watchVideoComponents/likeButton/LikeButton";
import { AuthContext } from "../../AuthContext";
import { ThemeContext } from "../../ThemeContext";
import GenericButton from "../../components/buttons/GenericButton";

const WatchVideo = () => {
  const { theme } = useContext(ThemeContext);
  const { currentUser } = useContext(AuthContext);
  const { videoId } = useParams(); // Get videoId from URL parameters
  const [video, setVideo] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [views, setViews] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likeSelected, setLikeSelected] = useState(false);
  const [dislikeSelected, setDislikeSelected] = useState(false);

  useEffect(() => {
    const foundVideo = videoDB.videos.find((v) => v.videoId === videoId);
    if (foundVideo) {
      setVideo(foundVideo);
      setLikes(foundVideo.likes);
      setDislikes(foundVideo.dislikes);
      setViews(foundVideo.views + 1); // Increment views
      setComments(foundVideo.comments);

      // Check if the current user has liked or disliked the video
      if (currentUser) {
        setLikeSelected(foundVideo.likedBy.includes(currentUser.userId));
        setDislikeSelected(foundVideo.dislikedBy.includes(currentUser.userId));
      }
    }
  }, [videoId, currentUser]);

  const handleLike = () => {
    if (!currentUser) return alert("You must be logged in to like a video.");

    if (likeSelected) {
      setLikes(likes - 1);
      setLikeSelected(false);
      video.likedBy = video.likedBy.filter((id) => id !== currentUser.userId);
    } else {
      setLikes(likes + 1);
      setLikeSelected(true);
      video.likedBy.push(currentUser.userId);
      if (dislikeSelected) {
        setDislikes(dislikes - 1);
        setDislikeSelected(false);
        video.dislikedBy = video.dislikedBy.filter((id) => id !== currentUser.userId);
      }
    }
  };

  const handleDislike = () => {
    if (!currentUser) return alert("You must be logged in to dislike a video.");

    if (dislikeSelected) {
      setDislikes(dislikes - 1);
      setDislikeSelected(false);
      video.dislikedBy = video.dislikedBy.filter((id) => id !== currentUser.userId);
    } else {
      setDislikes(dislikes + 1);
      setDislikeSelected(true);
      video.dislikedBy.push(currentUser.userId);
      if (likeSelected) {
        setLikes(likes - 1);
        setLikeSelected(false);
        video.likedBy = video.likedBy.filter((id) => id !== currentUser.userId);
      }
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) return alert("You must be logged in to comment.");

    if (newComment.trim()) {
      const newCommentObj = {
        commentId: Date.now().toString(),
        userId: currentUser.userId,
        comment: newComment,
        date: new Date().toLocaleDateString(),
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
      video.comments.push(newCommentObj);
    }
  };

  const handleCommentEdit = (commentId, updatedComment) => {
    const updatedComments = comments.map((comment) =>
      comment.commentId === commentId ? { ...comment, comment: updatedComment } : comment
    );
    setComments(updatedComments);
    const commentToEdit = video.comments.find((comment) => comment.commentId === commentId);
    if (commentToEdit) {
      commentToEdit.comment = updatedComment;
    }
  };

  if (!video) {
    return <div>404 Video not found</div>;
  }

  const videoContainer = (
    <div className={`container ${theme}`}>
      <video controls className="container-video">
        <source src={process.env.PUBLIC_URL + video.videoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={`container-body ${theme}`}>
        {" "}
        <div className="title-and-buttons">
          <h1 className="title">{}</h1>
          <div>
            <GenericButton />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="watch-video-container">
      {videoContainer}
      <div className="video-details">
        <div className="comments-section">
          <h2>Comments</h2>
          {comments.map((comment) => (
            <div key={comment.commentId} className="comment">
              <p>
                <strong>{usersDB.users.find((user) => user.userId === comment.userId).userName}</strong>:{" "}
                {comment.comment}
              </p>
              <p className="comment-date">{comment.date}</p>
              {currentUser && currentUser.userId === comment.userId && (
                <div>
                  <button
                    onClick={() => handleCommentEdit(comment.commentId, prompt("Edit your comment:", comment.comment))}
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              rows="4"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WatchVideo;
