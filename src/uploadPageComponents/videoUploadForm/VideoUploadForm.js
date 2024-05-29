import React from "react";
import "./VideoUploadForm.css";
import LabeledTextInput from "../../components/labeledTextInput/LabeledTextInput";
import ChoosePhotoButton from "../choosePhotoButton/ChoosePhotoButton";
import UploadButton from "../uploadButton/UploadButton";
import CancelUploadButton from "../cancelUploadButton/CancelUploadButton";

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
          <ChoosePhotoButton text = { "Choose a photo"} />
          <div className="video-photo-showcase">
            <img />
          </div>
        </div>
        <div className="upload-cancel-buttons">
          <UploadButton text = { "Upload video" } />
          <CancelUploadButton text = { "Cancel upload" } />
        </div>
      </div>
    </div>
  );
}

export default UploadVideoForm;
