import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TopBar.css";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import GenericButton from "../buttons/GenericButton";
import ProfilePhoto from "./profilePhoto/ProfilePhoto";
import LightDarkButton from "./lightDarkButton/LightDarkButton";
import Logo from "./logo/Logo";
import searchIcon from "../iconsLab/searchWhite.svg";

const TopBar = () => {
  const { theme } = useContext(ThemeContext);
  const { currentUser } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchClick = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search?search=${searchQuery}`);
    }
  };

  const handleSearchBarKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const searchBar = (
    <div className={`search-bar ${theme}`}>
      <input
        className={`transparent-input ${theme}`}
        name="searchQuery"
        placeholder="Search videos"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleSearchBarKeyDown}
      />
      <GenericButton icon={searchIcon} onClick={handleSearchClick} />
    </div>
  );

  const leftButtons = currentUser ? (
    <div className="top-bar-buttons">
      <GenericButton text="Upload Video" link="/uploadvideo" />
      <ProfilePhoto />
      <LightDarkButton />
    </div>
  ) : (
    <div className="top-bar-buttons">
      <GenericButton text="Sign up" link="/signup" />
      <GenericButton text="Log in" link="/login" />
      <LightDarkButton />
    </div>
  );

  return (
    <div className={`top-bar ${theme}`}>
      <Logo />
      {searchBar}
      {leftButtons}
    </div>
  );
};

export default TopBar;
