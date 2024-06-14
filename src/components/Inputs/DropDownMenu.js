import React, { useState, useContext, useRef, useEffect } from "react";
import "./Inputs.css";
import "../buttons/Buttons.css";
import { ThemeContext } from "../../contexts/ThemeContext";
import dropdownIcon from "../iconsLab/down.svg";
import searchIcon from "../iconsLab/searchWhite.svg";

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

  const DropdownTitle = (
    <div
      className={`field ${theme}`}
      id="dropdown-title"
      onMouseDown={(e) => {
        if (e.target !== e.currentTarget) return;
        e.preventDefault();
        updateDropDown();
      }}
    >
      <div className="title-flag-container">
        {dropdown ? (
          <>
            <img src={searchIcon} className="button-icon" alt="icon" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              className={`input-empty ${theme}`}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
          </>
        ) : (
          <>
            {props.showFlag && <img src={getFileName(props.value)} className="button-icon" alt="icon" />}
            {props.value}
          </>
        )}
      </div>
      <img
        src={dropdownIcon}
        className="button-icon"
        id={`dropdown-icon-${dropdown ? "activated" : "deactivated"}`}
        alt="icon"
      />
    </div>
  );

  const DropDownList = (
    <div className={`dropdown-list ${theme}`} id={`dropdown-list-${dropdown ? "activated" : "deactivated"}`}>
      {filteredItems.map((item, index) => (
        <div key={index} className={`dropdown-item ${theme}`} onClick={() => handleAction(props.name, item.name)}>
          {props.showFlag && <img src={item.fileName} className="button-icon" alt="icon" />}
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
