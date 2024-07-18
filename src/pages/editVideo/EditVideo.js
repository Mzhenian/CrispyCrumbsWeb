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
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

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
            thumbnail: fetchedVideo.thumbnail,
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: URL.createObjectURL(files[0]),
    }));
  };

  const handleTagsChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    //e.preventDefault();
    console.log("Submit button clicked");
    console.log("Form Data: ", formData);

    if (!formData.title || !formData.description || !formData.category || !formData.videoFile || !formData.thumbnail) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    const updatedVideo = {
      ...formData,
      userId: currentUser._id.toString(),
    };

    console.log("Updated Video Data: ", updatedVideo);

    try {
      await editVideo(videoId, updatedVideo, currentUser.token);
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
            {formData.thumbnail && (
              <div className="thumbnail-container">
                <img src={formData.thumbnail} alt="Thumbnail preview" className="home-video-thumbnail" />
              </div>
            )}
          </div>
          <div className="buttons-container">
            <GenericButton text="Update" type="submit" onClick={handleSubmit} icon={editIcon} />
            <LightButton text="Cancel" onClick={() => navigate(`/watch/${videoId}`)} icon={cancelIcon} />
            <LightButton text="Delete" onClick={handleDelete} />
          </div>
        </form>
      </Container>
    </div>
  );
};

export default EditVideo;
