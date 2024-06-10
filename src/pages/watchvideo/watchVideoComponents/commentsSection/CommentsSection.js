import React, { useState, useContext } from "react";
import usersDB from "../../../../DB/usersDB.json";
import "./commentsSection.css";
import { ThemeContext } from "../../../../ThemeContext";
import ProfilePhoto from "../../../../components/profilePhoto/ProfilePhoto";

const CommentsSection = ({ videoId, currentUser, comments, setComments }) => {
  const { theme } = useContext(ThemeContext);
  const [newComment, setNewComment] = useState("");

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
      setComments((prevComments) => [...prevComments, newCommentObj]);
      setNewComment("");
    }
  };

  const handleCommentEdit = (commentId, updatedComment) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.commentId === commentId ? { ...comment, comment: updatedComment } : comment
      )
    );
  };

  return (
    <div className="comments-section">
      <h2>Comments</h2>
      {comments.map((comment) => {
        const commentAuthor = usersDB.users.find((user) => user.userId === comment.userId);
        return (
          <div key={comment.commentId} className="comment">
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
      })}
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
  );
};

export default CommentsSection;
