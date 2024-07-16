import React, { useState, useContext, useRef, useEffect } from "react";
import "./Inputs.css";
import "../buttons/Buttons.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import dropdownIcon from "../iconsLab/down.svg";

export default function DropDownMenu(props) {
  const [dropdown, setDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);
  const theme = useContext(ThemeContext).theme;

  const updateDropDown = () => {
    setDropdown(!dropdown);
  };

  const handleAction = (name, value) => {
    props.action(name, value);
    updateDropDown();
  };

  const getFileName = (name) => {
    if (!name) return null;
    const lowercaseName = name.toLowerCase();
    const File = props.arr.find((c) => c.name && c.name.toLowerCase() === lowercaseName);
    return File ? File.fileName : null;
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && filteredItems.length > 0) {
      handleAction(props.name, filteredItems[0].name);
    }
  };

  const filteredItems = props.arr?.filter(
    (item) => item.name && item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const onClicking = (e) => {
    if (e.target !== e.currentTarget) return;
    e.preventDefault();
    updateDropDown();
  };

  const DropdownTitle = (
    <div
      className={`input-field ${theme}`}
      id={dropdown ? `dropdown-title-on` : `dropdown-title-off`}
      onMouseDown={(e) => onClicking(e)}
    >
      {" "}
      {dropdown ? (
        <input
          type="text"
          placeholder="Search..."
          value={search}
          className={`input-empty ${theme}`}
          id="dropdown-search"
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div className="title-flag-container">
          <>
            {props.showFlag && <img src={getFileName(props.value)} className="button-icon" alt="flag icon" />}
            {props.value}
          </>
        </div>
      )}
      <div className={`input-highlight ${theme}`} onMouseDown={(e) => onClicking(e)}>
        <img
          onMouseDown={(e) => onClicking(e)}
          src={dropdownIcon}
          className="button-icon"
          id={`dropdown-icon-${dropdown ? "activated" : "deactivated"}`}
          alt="dropdown icon"
        />
      </div>
    </div>
  );

  const DropDownList = (
    <div className={`dropdown-list ${theme}`} id={`dropdown-list-${dropdown ? "activated" : "deactivated"}`}>
      {filteredItems.map((item, index) => (
        <div key={index} className={`dropdown-item ${theme}`} onClick={() => handleAction(props.name, item.name)}>
          {props.showFlag && <img src={item.fileName} className="button-icon" alt="flag icon" />}
          {item.name}
        </div>
      ))}
    </div>
  );

  return (
    <div ref={dropdownRef} style={{ width: "100%" }}>
      {DropdownTitle}
      {DropDownList}
    </div>
  );
}
