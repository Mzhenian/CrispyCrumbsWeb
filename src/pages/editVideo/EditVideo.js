import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext.js";
import DropDownMenu from "../../components/inputs/DropDownMenu.js";
import ListInput from "../../components/inputs/ListInput.js";
import Container from "../../components/container/Container.js";
import GenericButton from "../../components/buttons/GenericButton.js";
import LightButton from "../../components/buttons/LightButton.js";
import { VideoContext } from "../../contexts/VideoContext.js";
import { AuthContext } from "../../contexts/AuthContext.js";
import { categories } from "../uploadVideo/UploadVideoData.js";
import "../uploadVideo/UploadVideo.css";

import cancelIcon from "../../components/iconsLab/closeOrange.svg";
import editIcon from "../../components/iconsLab/edit.svg";

const EditVideo = () => {
  const { theme } = useContext(ThemeContext);
  const { editVideo, getVideoById } = useContext(VideoContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: [],
    videoFile: null,
    thumbnail: null,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  const thumbnailInputRef = useRef(null);

  useEffect(() => {
    const video = getVideoById(videoId);
    setVideo(video);

    if (video && currentUser) {
      if (video.userId === currentUser.userId) {
        setIsAuthorized(true);
        setFormData({
          title: video.title,
          description: video.description,
          category: video.category,
          tags: video.tags,
          videoFile: video.videoFile,
          thumbnail: video.thumbnail,
        });
      } else {
        setIsAuthorized(false);
      }
    }
  }, [videoId, getVideoById, video, currentUser]);

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

    const updatedVideo = {
      ...formData,
      videoFile: formData.videoFile,
      thumbnail: formData.thumbnail,
      userId: currentUser.userId,
    };

    // Update video if all checks pass
    editVideo(videoId, updatedVideo);
    navigate("/");
  };

  if (!isAuthorized) {
    return (
      <div className={`page ${theme}`}>
        <p className={`error ${theme}`}>You are not authorized to edit this video.</p>
      </div>
    );
  }

  return (
    <div className={`page ${theme}`}>
      <Container title={"Edit Video"} containerStyle={"upload-video-container"}>
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
              name="description"
              id="description-field"
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
            <GenericButton text="Update" type="submit" onClick={handleSubmit} icon={editIcon} />
            <LightButton text="Cancel" link="/" icon={cancelIcon} />
          </div>
        </form>
      </Container>
    </div>
  );
};

export default EditVideo;
