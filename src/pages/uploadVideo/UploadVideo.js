import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext.js";
import DropDownMenu from "../../components/inputs/DropDownMenu.js";
import ListInput from "../../components/inputs/ListInput.js";
import Container from "../../components/container/Container.js";
import GenericButton from "../../components/buttons/GenericButton.js";
import LightButton from "../../components/buttons/LightButton.js";
import Popup from "../../components/popup/Popup.js";
import { VideoContext } from "../../contexts/VideoContext.js";
import { AuthContext } from "../../contexts/AuthContext.js";
import { categories } from "./UploadVideoData.js";
import uploadLight from "./components/uploadLogo/uploadLight.svg";
import uploadDark from "./components/uploadLogo/uploadDark.svg";
import uploadIcon from "../../components/iconsLab/upload.svg";
import cancelIcon from "../../components/iconsLab/closeOrange.svg";

import "./UploadVideo.css";
import VideoThumbnail from "../../components/videoThumbnail/VideoThumbnail.js";

const UploadVideo = () => {
  const { theme } = useContext(ThemeContext);
  const { uploadVideo } = useContext(VideoContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

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
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleVideoFileChange = (name, files) => {
    const file = files[0];
    if (file) {
      setFormData({
        ...formData,
        [name]: file,
      });
      setIsPopupOpen(false);
    } else {
      setErrorMessage("Please upload a valid video file.");
    }
  };

  const handleFileChange = (name, files) => {
    const file = files[0];
    if (file) {
      setFormData({
        ...formData,
        [name]: file,
      });
      setIsPopupOpen(false);
    }
  };

  const handleTagsChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    if (!formData.title || !formData.description || !formData.category || !formData.videoFile) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setIsUploading(true);
    const videoData = new FormData();
    videoData.append("videoFile", formData.videoFile);
    if (formData.thumbnail) {
      videoData.append("thumbnail", formData.thumbnail);
    }
    videoData.append("title", formData.title);
    videoData.append("description", formData.description);
    videoData.append("category", formData.category);
    videoData.append("tags", formData.tags.join(","));
    videoData.append("userId", currentUser._id);

    try {
      await uploadVideo(currentUser.token, videoData, currentUser._id);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
      setIsUploading(false);
    }
  };

  const videoInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);

  return (
    <div className={`page ${theme}`}>
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title="Upload Video"
        onFileDrop={(files) => handleVideoFileChange("videoFile", files)}
        canClose={false}
      >
        <div className="popup-body-content">
          <img
            className="upload-img"
            src={theme === "light" ? uploadLight : uploadDark}
            onClick={() => videoInputRef.current.click()}
            alt="upload"
          />
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
            <textarea
              className={`input-field ${theme}`}
              id="description-field"
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
            {formData.thumbnail && (
              <div>
                <VideoThumbnail img={URL.createObjectURL(formData.thumbnail)} />
              </div>
            )}
          </div>
          <div className="buttons-container">
            <GenericButton
              text="Upload"
              type="submit"
              onClick={handleSubmit}
              icon={uploadIcon}
              disabled={isUploading}
            />
            <LightButton text="Cancel" link="/" icon={cancelIcon} />
          </div>
        </form>
      </Container>
    </div>
  );
};

export default UploadVideo;
