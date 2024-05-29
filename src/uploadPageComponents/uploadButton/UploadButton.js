import "./UploadButton.css";
import React from "react";

// Logic need to be added for video upload

function UploadButton({text}) {
  return (
    <button className="upload-button">
      <span className="upload-button-text"> {text} </span>
    </button>
  );
}

export default UploadButton;
