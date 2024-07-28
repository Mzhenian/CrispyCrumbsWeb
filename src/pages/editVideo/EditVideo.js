import React, { useContext, useState, useRef, useEffect } from "react";
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
import VideoThumbnail from "../../components/videoThumbnail/VideoThumbnail.js";
import "../uploadVideo/UploadVideo.css";

import cancelIcon from "../../components/iconsLab/closeOrange.svg";
import editIcon from "../../components/iconsLab/edit.svg";
import Popup from "../../components/popup/Popup.js";

const EditVideo = () => {
  const { theme } = useContext(ThemeContext);
  const { editVideo, getVideoById, deleteVideo } = useContext(VideoContext);
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
    thumbnailPreview: null,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [fileError, setFileError] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [warningPopup, setWarningPopup] = useState(false);

  const thumbnailInputRef = useRef(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const fetchedVideo = await getVideoById(videoId);
      setVideo(fetchedVideo);

      if (fetchedVideo && currentUser) {
        if (fetchedVideo.userId === currentUser._id.toString()) {
          setIsAuthorized(true);
          setFormData({
            title: fetchedVideo.title,
            description: fetchedVideo.description,
            category: fetchedVideo.category,
            tags: fetchedVideo.tags,
            videoFile: fetchedVideo.videoFile,
            thumbnail: `${process.env.REACT_APP_API_URL}/api/db${fetchedVideo.thumbnail}`,
            thumbnailPreview: `${process.env.REACT_APP_API_URL}/api/db${fetchedVideo.thumbnail}`,
          });
        } else {
          setIsAuthorized(false);
        }
      }
    };

    fetchVideo();
  }, [videoId, getVideoById, currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml"];
      if (!validImageTypes.includes(file.type)) {
        setFileError("Invalid file type. Please upload an image.");
        return;
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: file,
        [`${name}Preview`]: URL.createObjectURL(file),
      }));
      setFileError("");
    }
  };

  const handleTagsChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    if (!formData.title || !formData.description || !formData.category) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    const updatedVideo = new FormData();
    updatedVideo.append("title", formData.title);
    updatedVideo.append("description", formData.description);
    updatedVideo.append("category", formData.category);
    updatedVideo.append("tags", formData.tags.join(","));
    if (formData.videoFile instanceof File) {
      updatedVideo.append("videoFile", formData.videoFile);
    }
    if (formData.thumbnail instanceof File) {
      updatedVideo.append("thumbnail", formData.thumbnail);
    }

    try {
      await editVideo(currentUser._id, videoId, updatedVideo, currentUser.token);
      navigate(`/watch/${videoId}`);
    } catch (error) {
      setErrorMessage("Error updating video.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteVideo(videoId, currentUser.token);
      navigate("/");
    } catch (error) {
      setErrorMessage("Error deleting video.");
    }
  };

  if (!isAuthorized) {
    return (
      <div className={`page ${theme}`}>
        <p className={`error ${theme}`}>You are not authorized to edit this video.</p>
      </div>
    );
  }

  return (
    video && (
      <div className={`page ${theme}`}>
        <Popup title="Warning" isOpen={warningPopup} onClose={() => setWarningPopup(false)}>
          <p>
            Are you sure you want to delete this video? This action cannot be undone and will permanently remove the
            video and all associated data.
          </p>
          <div className="buttons-container">
            <GenericButton text="Yes, delete the video" onClick={handleDelete} />
            <LightButton text="Cancel" onClick={() => setWarningPopup(false)} />
          </div>
        </Popup>

        <Container title={"Edit Video"} containerStyle={"upload-video-container"}>
          <form className="upload-form-container" onSubmit={handleSubmit}>
            {errorMessage && <b className={`error ${theme}`}>{errorMessage}</b>}
            <div className="field-container">
              <b>Title</b>
              <input
                className={`input-field ${theme}`}
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="field-container">
              <b>Description</b>
              <textarea
                className={`input-field ${theme}`}
                name="description"
                id="description-field"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="field-container">
              <b>Category</b>
              <DropDownMenu
                name="category"
                arr={categories}
                value={formData.category}
                showFlag={false}
                action={(name, value) => handleInputChange({ target: { name, value } })}
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
                  onChange={handleFileChange}
                  ref={thumbnailInputRef}
                  style={{ display: "none" }}
                />
                <GenericButton text="Upload Thumbnail" onClick={() => thumbnailInputRef.current.click()} />
              </div>
              {formData.thumbnailPreview && <VideoThumbnail img={formData.thumbnailPreview} />}
            </div>
            <div className="buttons-container">
              <GenericButton text="Update" type="submit" onClick={handleSubmit} icon={editIcon} />
              <LightButton text="Cancel" onClick={() => navigate(`/watch/${videoId}`)} icon={cancelIcon} />
              <LightButton text="Delete" onClick={() => setWarningPopup(true)} />
            </div>
            {errorMessage && <b className={`error ${theme}`}>{errorMessage}</b>}
          </form>
        </Container>
        <Popup title="Error" isOpen={fileError} onClose={() => setFileError("")}>
          <p>{fileError}</p>
          <div className="buttons-container">
            <GenericButton text="Close" onClick={() => setFileError("")} />
          </div>
        </Popup>
      </div>
    )
  );
};

export default EditVideo;
