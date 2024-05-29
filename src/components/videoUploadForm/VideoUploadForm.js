import React from "react";
import "./VideoUploadForm.css";
import LabeledTextInput from "../labeledTextInput/LabeledTextInput";
import FancyOrangeButton from "../fancyOrangeButton/FancyOrangeButton";
import FancyWhiteButton from "../fancyWhiteButton/FancyWhiteButton";

function UploadVideoForm() {
  return (
    <div className="videoUploadFormContainer">
      <div className="videoUploadFormTitle">
        <text className="videoUploadFormTitleText">Upload a video</text>
      </div>
      <div className="videoUpFormInnerContainer">
        <LabeledTextInput label = { "Title-" } />
        <LabeledTextInput label = { "Description-" } />
        <label>Tags-</label>
        <div className="photo-pick">
          <label>Pictures-</label>
          <FancyOrangeButton text = { "Choose a photo"} />
          <div className="video-photo-showcase">
            <img />
          </div>
        </div>
        <div className="upload-cancel-buttons">
          <FancyOrangeButton text = { "Upload video" } />
          <FancyWhiteButton text = { "Cancel upload" } />
        </div>
      </div>
    </div>
  );
}

export default UploadVideoForm;
