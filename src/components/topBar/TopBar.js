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

  const UploadLoginTitle = "Log in";
  const UploadSignUpTitle = "Sign up";
  const UploadVideoTitle = "Upload Video";

  const leftButtons = currentUser ? (
    <div className="top-bar-buttons">
      <GenericButton text={UploadVideoTitle} link={"/uploadvideo"} />
      <ProfilePhoto />
      <LightDarkButton />
    </div>
  ) : (
    <div className="top-bar-buttons">
      <GenericButton text={UploadSignUpTitle} link={"/signup"} />
      <GenericButton text={UploadLoginTitle} link={"/login"} />
      <LightDarkButton />
    </div>
  );

  const handleSearchClick = () => {
    if (searchQuery !== "") {
      navigate(`/?search=${searchQuery}`);
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

  return (
    <div className={`top-bar ${theme}`}>
      <Logo />
      {searchBar}
      {leftButtons}
    </div>
  );
};

export default TopBar;
