import React, { useState, useRef, useEffect } from "react";
import "./inputs.css";
import dropdownIcon from "../iconsLab/down.svg";
import searchIcon from "../iconsLab/searchWhite.svg";

export default function DropDownMenu(props) {
  const [dropdown, setDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  const updateDropDown = () => {
    setDropdown(!dropdown);
  };

  const action = (name, value) => {
    props.action(name, value);
    updateDropDown();
  };

  const getFileName = (name) => {
    if (!name) return null; // Check for undefined name
    const lowercaseName = name.toLowerCase();
    const File = props.arr.find((c) => c.name && c.name.toLowerCase() === lowercaseName);
    return File ? File.fileName : null;
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && filteredItems.length > 0) {
      // If Enter key is pressed and there are filtered items, select the first item
      action(props.name, filteredItems[0].name);
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
    // Attach the event listener on mount
    document.addEventListener("mousedown", handleOutsideClick);

    // Detach the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []); // Empty dependency array means this effect will only run on mount and unmount

  const DropdownTitle = (
    <div
      className="field"
      id="dropdown-title"
      onMouseDown={(e) => {
        e.preventDefault();
        updateDropDown();
      }}
    >
      <div className="title-flag-container">
        {dropdown ? (
          <>
            <img src={searchIcon} className="flag-icon" alt="icon" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              className="input-empty"
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
          </>
        ) : (
          <>
            {props.showFlag && <img src={getFileName(props.value)} className="flag-icon" alt="icon" />}
            {props.value}
          </>
        )}
      </div>
      <img
        src={dropdownIcon}
        className="App-icon"
        id={`dropdown-icon-${dropdown ? "activated" : "deactivated"}`}
        alt="icon"
      />
    </div>
  );

  const DropDownList = (
    <div className="dropdown-list" id={`dropdown-list-${dropdown ? "activated" : "deactivated"}`}>
      {filteredItems.map((item, index) => (
        <div key={index} className="dropdown-item" onClick={(e) => action(props.name, item.name)}>
          {props.showFlag && <img src={item.fileName} className="flag-icon" alt="icon" />}
          {item.name}
        </div>
      ))}
      fffff
    </div>
  );

  return (
    <div ref={dropdownRef}>
      {DropdownTitle}
      {DropDownList}
    </div>
  );
}
