import React, { useState, useContext } from "react";
import "./Inputs.css";
import "../buttons/Buttons.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import addIcon from "../iconsLab/add.svg";
import List from "./List";

export default function ListInput(props) {
  const [textBox, setTextBox] = useState("");
  const theme = useContext(ThemeContext).theme;

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
      props.action(props.name, [...props.list, processing(textBox)]);
      setTextBox("");
    }
  };

  return (
    <div>
      {props.editMode && (
        <div className={`field ${theme}`} id="input-title">
          <div>
            <input className={`input-empty ${theme}`} type="text" value={textBox} onChange={handleTextBoxChange} />
          </div>
          <img
            type="button"
            value={textBox}
            name={props.name}
            id={props.name}
            onClick={addItem}
            src={addIcon}
            className="button-icon"
            alt="icon"
          />
        </div>
      )}
      <List
        action={props.action}
        list={props.list || []} // Ensure list is always an array
        listName={props.name}
        editMode={props.editMode}
      />
    </div>
  );
}
