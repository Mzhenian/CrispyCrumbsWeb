import React from "react";
import "./LabeledTextInput.css";

function LabeledTextInput({ label}) {
  return (
    <div className="LabeledTextInputContainer">
      <label className="label-input">{label}</label>
      <input type="text" className="text-input"></input>
    </div>
  );
}

export default LabeledTextInput;
