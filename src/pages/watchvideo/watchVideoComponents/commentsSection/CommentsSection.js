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
  const { getUserBasicById } = useContext(AuthContext);
  const [video, setVideo] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [commentAuthors, setCommentAuthors] = useState({});

  useEffect(() => {
    const fetchVideo = async () => {
      const fetchedVideo = await getVideoById(videoId);
      setVideo(fetchedVideo);

      const authors = await Promise.all(
        fetchedVideo.comments.map(async (comment) => {
          const user = await getUserBasicById(comment.userId);
          return { [comment.commentId]: user };
        })
      );

      const authorsMap = Object.assign({}, ...authors);
      setCommentAuthors(authorsMap);
    };

    fetchVideo();
  }, [videoId, getVideoById, getUserBasicById]);

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      const newCommentObj = {
        comment: newComment,
      };
      const addedComment = await addComment(videoId, newCommentObj);

      if (addedComment) {
        setVideo((prevVideo) => ({
          ...prevVideo,
          comments: [...prevVideo.comments, addedComment],
        }));

        setCommentAuthors((prevAuthors) => ({
          ...prevAuthors,
          [addedComment.commentId]: currentUser,
        }));

        setNewComment("");
      }
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
      date: new Date().toISOString(),
    };

    await editComment(videoId, updatedComment);

    setVideo((prevVideo) => {
      const updatedComments = prevVideo.comments.map((comment) =>
        comment.commentId === commentId ? updatedComment : comment
      );
      return { ...prevVideo, comments: updatedComments };
    });

    setCommentAuthors((prevAuthors) => ({
      ...prevAuthors,
      [commentId]: currentUser,
    }));

    setEditingCommentId(null);
    setEditingText("");
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingText("");
  };

  const handleDeleteClick = async (commentId) => {
    await deleteComment(videoId, commentId, currentUser._id.toString());

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
        style={{ resize: "none" }}
      />
      <div className="comment-buttons">
        <GenericButton text="Comment" onClick={handleCommentSubmit} />
        <LightButton text="Cancel" onClick={handleCancel} />
      </div>
    </div>
  );

  const commentsList = video.comments.map((comment) => {
    const commentAuthor = commentAuthors[comment.commentId];

    if (!commentAuthor) {
      return <div key={comment.commentId}></div>;
    }

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
            <ProfilePhoto user={commentAuthor} clickable />
            <div className="comment-data">
              <div className="comment-title">
                <b>@{commentAuthor.userName}</b>
                <span className="note">{new Date(comment.date).toLocaleDateString()}</span>
              </div>
              <p style={{ whiteSpace: "pre-wrap" }}>{comment.comment}</p>
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
