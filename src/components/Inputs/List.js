import "./Inputs.css";
import "../buttons/Buttons.css";
import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

import removeIcon from "../iconsLab/close.svg";

export default function List(props) {
  const theme = useContext(ThemeContext).theme;

  const removeItem = (index) => {
    const updatedList = props.list;
    updatedList.splice(index, 1);
    props.action(props.listName, updatedList);
  };

  const removeAll = () => {
    props.action(props.listName, []);
  };

  return (
    props.list.length !== 0 && (
      <div className="input-items-list">
        {props.list.map((item, index) => (
          <div className={`field ${theme}`} id="input-item" key={index}>
            {item}
            {props.editMode && (
              <img src={removeIcon} className="button-icon" id="action-icon" alt="icon" onClick={() => removeItem()} />
            )}
          </div>
        ))}
        {props.list.length > 2 && props.editMode && (
          <div className={`field ${theme}`} id="input-item" onClick={() => removeAll()}>
            Remove All
          </div>
        )}
      </div>
    )
  );
}
