import React, { useState, useContext } from "react";
import { VideoContext } from "../../../../contexts/VideoContext";
import "./commentsSection.css";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import ProfilePhoto from "../../../../components/profilePhoto/ProfilePhoto";
import GenericButton from "../../../../components/buttons/GenericButton";
import LightButton from "../../../../components/buttons/LightButton";
import editIcon from "../../../../components/iconsLab/edit.svg";

const CommentsSection = ({ currentUser, videoId }) => {
  const { theme } = useContext(ThemeContext);
  const { getUserById, getVideoById, addComment, editComment, deleteComment } = useContext(VideoContext);
  const video = getVideoById(videoId);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        commentId: Date.now().toString(),
        userId: currentUser._id.toString(),
        comment: newComment,
        date: new Date().toISOString(), // Use ISO string for consistent date formatting
      };
      addComment(videoId, newCommentObj);
      setNewComment("");
    }
  };
  

  const handleCancel = () => {
    setNewComment("");
  };

  const handleEditClick = (commentId, commentText) => {
    setEditingCommentId(commentId);
    setEditingText(commentText);
  };

  const handleSaveEdit = (commentId) => {
    const updatedComment = {
      ...video.comments.find((comment) => comment.commentId === commentId),
      comment: editingText,
    };
    editComment(videoId, updatedComment);
    setEditingCommentId(null);
    setEditingText("");
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingText("");
  };

  const handleDeleteClick = (commentId) => {
    deleteComment(videoId, commentId);
  };

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

  const commentsList =
    video.comments &&
    video.comments.map((comment) => {
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
                <LightButton text="Delete" onClick={() => handleDeleteClick(comment.commentId, comment.comment)} />
              </div>
            </div>
          ) : (
            <div id="comment">
              <ProfilePhoto user={commentAuthor} />
              <div className="comment-data">
                <div className="comment-title">
                  <b>@{commentAuthor.userName}</b> {comment.date}
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
