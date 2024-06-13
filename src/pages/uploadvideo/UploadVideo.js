import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../ThemeContext.js";
import DropDownMenu from "../../components/Inputs/DropDownMenu.js";
import Container from "../../components/container/Container.js";
import GenericButton from "../../components/buttons/GenericButton.js";
import LightButton from "../../components/buttons/LightButton.js";
import { VideoContext } from "../../contexts/VideoContext.js";
import { AuthContext } from "../../contexts/AuthContext.js";
import { categories } from "./UploadVideoData.js";
import "./uploadVideo.css";

const UploadVideo = () => {
  const tags = []; // Ensure this is populated with your actual tags data
  const { theme } = useContext(ThemeContext);
  const { uploadVideo } = useContext(VideoContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: [],
    videoFile: null,
    thumbnail: null,
  });
  const [errorMessage, setErrorMessage] = useState(""); // State to store error messages

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleTagsChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    if (!formData.title || !formData.description || !formData.category || !formData.videoFile || !formData.thumbnail) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    const newVideo = {
      videoId: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      tags: formData.tags,
      videoFile: URL.createObjectURL(formData.videoFile),
      thumbnail: URL.createObjectURL(formData.thumbnail),
      userId: currentUser.userId,
      views: 0,
      likes: 0,
      dislikes: 0,
      uploadDate: new Date().toLocaleDateString(),
      comments: [],
      likedBy: [],
      dislikedBy: [],
    };

    // Upload video if all checks pass
    uploadVideo(newVideo);

    navigate("/");
  };

  const videoInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);

  return (
    <div className={`page ${theme}`}>
      <Container title={"Upload Video"} containerStyle={"upload-video-container"}>
        <form className="upload-form-container" onSubmit={handleSubmit}>
          {errorMessage && <b className={`error ${theme}`}>{errorMessage}</b>}
          <div className="field-container">
            <b>Video File</b>
            <input
              className="field"
              name="videoFile"
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              ref={videoInputRef}
              style={{ display: "none" }}
            />
            <GenericButton
              text="Upload Video"
              onClick={(e) => {
                videoInputRef.current.click();
              }}
            />
          </div>
          <div className="field-container">
            <b>Title</b>
            <input
              className={`field ${theme}`}
              name="title"
              value={formData.title}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>
          <div className="field-container">
            <b>Description</b>
            <textarea
              className={`field ${theme}`}
              name="description"
              value={formData.description}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>
          <div className="field-container">
            <b>Category</b>
            <DropDownMenu
              name="category"
              arr={categories}
              value={formData.category}
              showFlag={false}
              action={handleInputChange}
            />
          </div>
          <div className="field-container">
            <b>Tags</b>
            <DropDownMenu
              name="tags"
              arr={tags}
              value={formData.tags}
              showFlag={false}
              action={handleTagsChange}
              multiple
            />
          </div>
          <div className="field-container">
            <b>Thumbnail</b>
            <input
              className="field"
              name="thumbnail"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={thumbnailInputRef}
              style={{ display: "none" }}
            />
            <GenericButton
              text="Upload Thumbnail"
              onClick={(e) => {
                thumbnailInputRef.current.click();
              }}
            />
          </div>
          <div className="buttons-container">
            <GenericButton text="Upload" type="submit" onClick={handleSubmit} />
            <LightButton text="Cancel" link="/" />
          </div>
        </form>
      </Container>
    </div>
  );
};

export default UploadVideo;
