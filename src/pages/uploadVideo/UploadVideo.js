import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext.js";
import DropDownMenu from "../../components/Inputs/DropDownMenu.js";
import ListInput from "../../components/Inputs/ListInput.js";
import Container from "../../components/container/Container.js";
import GenericButton from "../../components/buttons/GenericButton.js";
import LightButton from "../../components/buttons/LightButton.js";
import Popup from "../../components/popup/Popup.js";
import { VideoContext } from "../../contexts/VideoContext.js";
import { AuthContext } from "../../contexts/AuthContext.js";
import { categories } from "./UploadVideoData.js";
import uploadLight from "./components/uploadLogo/uploadLight.svg";
import uploadDark from "./components/uploadLogo/uploadLight.svg";
import "./UploadVideo.css";

const UploadVideo = () => {
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
  const [errorMessage, setErrorMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (name, files) => {
    setFormData({
      ...formData,
      [name]: files[0],
    });
    setIsPopupOpen(false); // Close the popup once the file is selected or dropped
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
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title="Upload Video"
        onFileDrop={(files) => handleFileChange("videoFile", files)}
        canClose={false}
      >
        <div className="popup-body-content">
          <img className="upload-img" src={theme === "light" ? uploadLight : uploadDark} alt="upload" />
          <p className="upload-click-here" onClick={() => videoInputRef.current.click()}>
            Click to here upload a file or drag and drop a file here.
          </p>
          <input
            className="field"
            name="videoFile"
            type="file"
            accept="video/*"
            onChange={(e) => handleFileChange(e.target.name, e.target.files)}
            ref={videoInputRef}
            style={{ display: "none" }}
          />
        </div>
      </Popup>
      <Container title={"Upload Video"} containerStyle={"upload-video-container"}>
        <form className="upload-form-container" onSubmit={handleSubmit}>
          {errorMessage && <b className={`error ${theme}`}>{errorMessage}</b>}
          <div className="field-container">
            <b>Title</b>
            <input
              className={`input-field ${theme}`}
              name="title"
              value={formData.title}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>
          <div className="field-container">
            <b>Description</b>
            <input
              className={`input-field ${theme}`}
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
              action={(name, value) => handleInputChange(name, value)}
            />
          </div>
          <div className="field-container">
            <b>Tags</b>
            <ListInput name="tags" list={formData.tags} action={handleTagsChange} editMode={true} />
          </div>
          <div className="field-container">
            <div className="linear-layout-2">
              <b>Thumbnail</b>
              <input
                className={`input-field ${theme}`}
                name="thumbnail"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e.target.name, e.target.files)}
                ref={thumbnailInputRef}
                style={{ display: "none" }}
              />
              <GenericButton text="Upload Thumbnail" onClick={() => thumbnailInputRef.current.click()} />
            </div>
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
