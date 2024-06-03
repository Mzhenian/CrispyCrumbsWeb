import React from "react";
import "./VideoUploadForm.css";
import LabeledTextInput from "../../components/labeledTextInput/LabeledTextInput";
import GenericButton from "../../components/buttons/GenericButton";
import LightButton from "../../components/buttons/LightButton";

function UploadVideoForm() {
  return (
    <div className="videoUploadFormContainer">
      <div className="videoUploadFormTitle">
        <text className="videoUploadFormTitleText">Upload a video</text>
      </div>
      <div className="videoUpFormInnerContainer">
        <LabeledTextInput label={"Title-"} />
        <LabeledTextInput label={"Description-"} />

        <label>Tags-</label>
        <div className="photo-pick">
          <label>Pictures-</label>
          <GenericButton text={"Choose a photo"} />
          <div className="video-photo-showcase">
            <img />
          </div>
        </div>
        <div className="upload-cancel-buttons">
          <GenericButton text={"Upload video"} />
          <LightButton text={"Cancel upload"} />
        </div>
      </div>
    </div>
  );
}

export default UploadVideoForm;