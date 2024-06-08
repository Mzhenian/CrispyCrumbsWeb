import React, { useState } from "react";
import "./inputs.css";
import "../buttons/buttons.css";
import addIcon from "../iconsLab/add.svg";
import List from "./List";

export default function ListInput(props) {

  const [textBox, setTextBox] = useState("");

  const handleTextBoxChange = (e) => {
    setTextBox(e.target.value);
  };

  const checkItem = (item) => {
    if (item === "" || props.list.includes(item)) {
      return false;
    }
    if (typeof props.test === "function") {
      return props.test(item);
    }
    return true;
  };

  const processing = (item) => {
    if (typeof props.process === "function") {
      return props.process(item);
    }
    return item;
  };

  const addItem = () => {
    if (checkItem(textBox)) {
      props.action(props.listName, [...props.list, processing(textBox)]);
      setTextBox("");
    }
  };

  return (
    <div>
      <div className="field" id="input-title">
        <div>
          <input className="input-empty" type="text" value={textBox} onChange={handleTextBoxChange} />
        </div>
        <img
          type="button"
          value={textBox}
          name={props.listName}
          id={props.listName}
          onClick={addItem}
          src={addIcon}
          className="button-icon"
          alt="icon"
        />
      </div>
      <List
        action={props.action}
        list={props.list || []} // Ensure list is always an array
        listName={props.listName}
        editMode={props.editMode}
      />
    </div>
  );
}
