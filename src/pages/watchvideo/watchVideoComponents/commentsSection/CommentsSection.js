import React, { useState, useContext, useEffect } from "react";
import { VideoContext } from "../../../../contexts/VideoContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import "./commentsSection.css";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import ProfilePhoto from "../../../../components/profilePhoto/ProfilePhoto";
import GenericButton from "../../../../components/buttons/GenericButton";
import LightButton from "../../../../components/buttons/LightButton";
import editIcon from "../../../../components/iconsLab/edit.svg";

const CommentsSection = ({ currentUser, videoId }) => {
  const { theme } = useContext(ThemeContext);
  const { getVideoById, addComment, editComment, deleteComment } = useContext(VideoContext);
  const { getUserById } = useContext(AuthContext);
  const [video, setVideo] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Fetch video details including comments
  useEffect(() => {
    const fetchVideo = async () => {
      const fetchedVideo = await getVideoById(videoId);
      setVideo(fetchedVideo);
    };
    fetchVideo();
  }, [videoId, getVideoById]);

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      const newCommentObj = {
        userId: currentUser._id.toString(),
        comment: newComment,
        date: new Date().toISOString(), // Ensure the date is provided in ISO format
      };
      console.log("Submitting new comment:", newCommentObj); // Log the new comment object
      await addComment(videoId, newCommentObj);
      setNewComment("");

      // Refresh the video to get the latest comments
      const updatedVideo = await getVideoById(videoId);
      setVideo(updatedVideo);
    }
  };

  const handleCancel = () => {
    setNewComment("");
  };

  const handleEditClick = (commentId, commentText) => {
    setEditingCommentId(commentId);
    setEditingText(commentText);
  };

  const handleSaveEdit = async (commentId) => {
    const updatedComment = {
      commentId,
      userId: currentUser._id.toString(),
      comment: editingText,
      date: new Date().toISOString(), // Ensure the date is provided in ISO format
    };
    await editComment(videoId, updatedComment);
    setEditingCommentId(null);
    setEditingText("");

    // Refresh the video to get the latest comments
    const updatedVideo = await getVideoById(videoId);
    setVideo(updatedVideo);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingText("");
  };

  const handleDeleteClick = async (commentId) => {
    await deleteComment(videoId, commentId, currentUser._id.toString());

    // Refresh the video to get the latest comments
    const updatedVideo = await getVideoById(videoId);
    setVideo(updatedVideo);
  };

  if (!video) {
    return <div>Loading...</div>;
  }

  const writeComment = currentUser && (
    <div className={`comment-box ${theme}`} id="write-comment">
      <textarea
        value={newComment}
        className={`input-empty ${theme}`}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
        rows="4"
        style={{ resize: "none" }} // Disable resize
      />
      <div className="comment-buttons">
        <GenericButton text="Comment" onClick={handleCommentSubmit} />
        <LightButton text="Cancel" onClick={handleCancel} />
      </div>
    </div>
  );

  const commentsList = video.comments && video.comments.map((comment) => {
    const commentAuthor = getUserById(comment.userId);
    return (
      <div key={comment.commentId} className={`comment-box ${theme}`} id="comment">
        {editingCommentId === comment.commentId ? (
          <div className="edit-comment">
            <textarea
              className={`input-empty ${theme}`}
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              rows="4"
            />

            <div className="comment-buttons">
              <GenericButton text="Save" onClick={() => handleSaveEdit(comment.commentId)} />
              <LightButton text="Cancel" onClick={handleCancelEdit} />
              <LightButton text="Delete" onClick={() => handleDeleteClick(comment.commentId)} />
            </div>
          </div>
        ) : (
          <div id="comment">
            <ProfilePhoto user={commentAuthor} />
            <div className="comment-data">
              <div className="comment-title">
                <b>@{commentAuthor.userName}</b> {new Date(comment.date).toLocaleDateString()}
              </div>
              <p>{comment.comment}</p>
            </div>
          </div>
        )}
        {currentUser && currentUser._id.toString() === comment.userId && editingCommentId !== comment.commentId && (
          <div className="edit-button-container">
            <GenericButton icon={editIcon} onClick={() => handleEditClick(comment.commentId, comment.comment)} />
          </div>
        )}
      </div>
    );
  });

  return (
    <div className="comments-section">
      <h2>Comments</h2>
      <div className="comments-list">
        {writeComment}
        {commentsList}
      </div>
    </div>
  );
};

export default CommentsSection;
