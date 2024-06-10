import React, { useState, useContext } from "react";
import usersDB from "../../../../DB/usersDB.json";
import "./commentsSection.css";
import { ThemeContext } from "../../../../ThemeContext";
import ProfilePhoto from "../../../../components/profilePhoto/ProfilePhoto";
import GenericButton from "../../../../components/buttons/GenericButton";
import LightButton from "../../../../components/buttons/LightButton";

const CommentsSection = ({ currentUser, comments, setComments }) => {
  const { theme } = useContext(ThemeContext);
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (newComment.trim()) {
      const newCommentObj = {
        commentId: Date.now().toString(),
        userId: currentUser.userId,
        comment: newComment,
        date: new Date().toLocaleDateString(),
      };
      setComments((prevComments) => [...prevComments, newCommentObj]);
      setNewComment("");
    }
  };

  const handleCancel = (e) => {
    setNewComment("");
  };

  const handleCommentEdit = (commentId, updatedComment) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.commentId === commentId ? { ...comment, comment: updatedComment } : comment
      )
    );
  };

  const writeComment = currentUser && (
    <div className={`comment-box ${theme}`}>
      <textarea
        value={newComment}
        className={`input-empty ${theme}`}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
        rows="4"
      />
      <div className="comment-buttons">
        <GenericButton text="Comment" onClick={handleCommentSubmit} />
        <LightButton text="Cancel" onClick={handleCancel} />
      </div>
    </div>
  );

  const commentsList =
    comments &&
    comments.map((comment) => {
      const commentAuthor = usersDB.users.find((user) => user.userId === comment.userId);
      return (
        <div key={comment.commentId} className="comment">
          <ProfilePhoto profile={commentAuthor} />
          <p>
            <strong>{commentAuthor.userName}</strong>: {comment.comment}
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
      );
    });
  return (
    <div className="comments-section">
      <h2>Comments</h2>
      {writeComment}
      {commentsList}
    </div>
  );
};

export default CommentsSection;
