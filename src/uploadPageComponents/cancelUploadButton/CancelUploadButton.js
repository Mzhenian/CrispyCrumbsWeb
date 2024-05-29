import "./CancelUploadButton.css";
import React from "react";


function CancelUploadButton({ text }) {
  return (
    <button className="cancel-upload-button">
      <span className="cancel-upload-button-text"> {text} </span>
    </button>
  );
}

export default CancelUploadButton;
