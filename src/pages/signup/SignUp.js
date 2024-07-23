import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext.js";
import { AuthContext } from "../../contexts/AuthContext.js";
import DropDownMenu from "../../components/inputs/DropDownMenu.js";
import Container from "../../components/container/Container.js";
import GenericButton from "../../components/buttons/GenericButton.js";
import LightButton from "../../components/buttons/LightButton.js";
import "./SignUp.css";
import TermsOfUse from "./components/TermsOfUse.js";
import OnOffToggle from "../../components/inputs/toggle/OnOffToggle.js";
import { months, days, years } from "./SignUpData.js";
import countries from "../../DB/Countries/CountriesListsData.js";
import ProfilePhoto from "../../components/profilePhoto/ProfilePhoto.js";

const SignUp = () => {
  const { theme } = useContext(ThemeContext);
  const { signup, isUsernameAvailable, isEmailAvailable } = useContext(AuthContext);
  const navigate = useNavigate();

  const defaultPhoto = process.env.PUBLIC_URL + "/users/default.png";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    birthday: {
      month: "January",
      day: "1",
      year: "1990",
    },
    username: "",
    password: "",
    password_auth: "",
    country: "Israel",
    profilePhoto: "",
    phoneNumber: "",
    acceptTerms: false,
  });
  const [errorMessage, setErrorMessage] = useState(""); // State to store error messages
  const [isTermsOpen, setIsTermsOpen] = useState(false); // State to manage terms popup

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDropDownChange = (name, value) => {
    if (name in formData.birthday) {
      setFormData((prevState) => ({
        ...prevState,
        birthday: {
          ...prevState.birthday,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleToggleChange = () => {
    setFormData((prevState) => ({
      ...prevState,
      acceptTerms: !prevState.acceptTerms,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      profilePhoto: file,
    }));
  };

  const handleSubmit = async (e) => {
    if (formData.username.length < 3) {
      setErrorMessage("Username must be at least 3 characters long.");
      return;
    }

    if (formData.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    if (formData.password !== formData.password_auth) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    const usernameAvailable = await isUsernameAvailable(formData.username);
    if (!usernameAvailable) {
      setErrorMessage("Username already exists. Please choose a different one.");
      return;
    }

    const emailAvailable = await isEmailAvailable(formData.email);
    if (!emailAvailable) {
      setErrorMessage("Email already exists. Please choose a different one.");
      return;
    }

    if (formData.phoneNumber.length < 10 || formData.phoneNumber.length > 15) {
      setErrorMessage("Phone number must be between 10 and 15 digits.");
      return;
    }

    if (!formData.acceptTerms) {
      setErrorMessage("You must accept the terms of use to sign up.");
      return;
    }

    if (!formData.email || !formData.phoneNumber || !formData.fullName) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    const newUser = {
      userName: formData.username,
      email: formData.email,
      password: formData.password,
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      birthday: `${formData.birthday.year}-${formData.birthday.month}-${formData.birthday.day}`,
      country: formData.country,
      profilePhoto: formData.profilePhoto ? formData.profilePhoto : defaultPhoto,
    };

    await signup(newUser);
    navigate("/");
  };

  const fileInputRef = useRef(null);

  return (
    <div className={`page ${theme}`}>
      <Container title={"Sign up"} containerStyle={"signup-container"}>
        <form className="signup-form-container" onSubmit={handleSubmit}>
          {errorMessage && <b className={`error ${theme}`}>{errorMessage}</b>}
          <div className="field-container">
            <b>Full Name</b>
            <input
              className={`input-field ${theme}`}
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div className="field-container">
            <b>Username</b>
            <input
              className={`input-field ${theme}`}
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="field-container">
            <b>Email</b>
            <input
              className={`input-field ${theme}`}
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="field-container">
            <b>Password</b>
            <input
              className={`input-field ${theme}`}
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="field-container">
            <b>Confirm Password</b>
            <input
              className={`input-field ${theme}`}
              name="password_auth"
              type="password"
              value={formData.password_auth}
              onChange={handleInputChange}
            />
          </div>
          <div className="field-container">
            <b>Country</b>
            <DropDownMenu
              name="country"
              arr={countries}
              value={formData.country}
              showFlag={true}
              action={handleDropDownChange}
            />
          </div>
          <div className="field-container">
            <b>Birthday</b>
            <div className="birthday-dropdowns">
              <DropDownMenu
                name="month"
                arr={months}
                value={formData.birthday.month}
                showFlag={false}
                action={handleDropDownChange}
              />
              <DropDownMenu
                name="day"
                arr={days}
                value={formData.birthday.day}
                showFlag={false}
                action={handleDropDownChange}
              />
              <DropDownMenu
                name="year"
                arr={years}
                value={formData.birthday.year}
                showFlag={false}
                action={handleDropDownChange}
              />
            </div>
          </div>
          <div className="field-container">
            <b>Phone Number</b>
            <input
              className={`input-field ${theme}`}
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="field-container">
            <div className="linear-layout-2">
              <b>Profile Photo</b>
              <input
                className="field"
                name="profilePhoto"
                type="file"
                onChange={handlePhotoChange}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
              <GenericButton
                text="Upload Photo"
                onClick={(e) => {
                  fileInputRef.current.click();
                }}
              />
            </div>
            {formData.profilePhoto && (
              <ProfilePhoto img={URL.createObjectURL(formData.profilePhoto)} profilePhotoStyle="profilePhotoStyle" />
            )}
          </div>
          <div className="field-container">
            <div className="linear-layout-2">
              <b>
                I agree to the{" "}
                <span className={`terms-text ${theme}`} onClick={() => setIsTermsOpen(true)}>
                  Terms of use
                </span>
              </b>
              <OnOffToggle name="acceptTerms" value={formData.acceptTerms} action={handleToggleChange} />
            </div>
          </div>
          <div className="buttons-container">
            <GenericButton text="Sign up" type="submit" onClick={(e) => handleSubmit(e)} />
            <LightButton text="Login" link="/login" />
          </div>
        </form>
        <TermsOfUse isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      </Container>
    </div>
  );
};

export default SignUp;
