import React, { useContext } from "react";
import "./topBar.css";

import { ThemeContext } from "../../ThemeContext";
import GenericButton from "../buttons/GenericButton";
import LightDarkButton from "./lightDarkButton/LightDarkButton";

import Logo from "./logo/Logo";
import searchIcon from "../iconsLab/searchWhite.svg";

const TopBar = ({ logged }) => {
  const theme = useContext(ThemeContext).theme;

  const UploadLoginTitle = "Sign up";
  const UploadSignUpTitle = "Log in";
  const UploadVideoTitle = "Upload Video";

  const searchBar = (
    <div className={`search-bar ${theme}`}>
      <input className={`transparent-input ${theme}`}></input>
      <GenericButton icon={searchIcon} />
    </div>
  );

  const leftButtons = logged ? (
    <div className="top-bar-buttons">
      <GenericButton text={UploadVideoTitle} link={"/uploadvideo"} />
      <LightDarkButton />
    </div>
  ) : (
    <div className="top-bar-buttons">
      <GenericButton text={UploadLoginTitle} link={"/login"} />
      <GenericButton text={UploadSignUpTitle} link={"/signup"} />
      <LightDarkButton />
    </div>
  );

  console.log(theme);
  return (
    <div className={`top-bar ${theme}`}>
      <Logo />
      {searchBar}
      {leftButtons}
    </div>
  );
};

export default TopBar;
