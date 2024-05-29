import "./ChoosePhotoButton.css";
import React from "react";

// Logic need to be added for video upload

function ChoosePhotoButton({ text }) {
  return (
    <button className="choose-photo-button">
      <span className="choose-photo-button-text"> {text} </span>
    </button>
  );
}

export default ChoosePhotoButton;
