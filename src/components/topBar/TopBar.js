import React, { useContext } from "react";
import "./topBar.css";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../ThemeContext";
import GenericButton from "../buttons/GenericButton";
import ProfilePhoto from "./profilePhoto/ProfilePhoto";
import LightDarkButton from "./lightDarkButton/LightDarkButton";
import Logo from "./logo/Logo";
import searchIcon from "../iconsLab/searchWhite.svg";

const TopBar = () => {
  const { theme } = useContext(ThemeContext);
  const { currentUser } = useContext(AuthContext);

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

  const searchBar = (
    <div className={`search-bar ${theme}`}>
      <input className={`transparent-input ${theme}`} />
      <GenericButton icon={searchIcon} />
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
