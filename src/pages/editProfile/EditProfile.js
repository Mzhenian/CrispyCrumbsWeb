import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext.js";
import { AuthContext } from "../../contexts/AuthContext.js";
import DropDownMenu from "../../components/inputs/DropDownMenu.js";
import Container from "../../components/container/Container.js";
import GenericButton from "../../components/buttons/GenericButton.js";
import LightButton from "../../components/buttons/LightButton.js";
import "../signup/SignUp.css";
import { months, days, years } from "../signup/SignUpData.js";
import countries from "../../DB/Countries/CountriesListsData.js";
import ProfilePhoto from "../../components/profilePhoto/ProfilePhoto.js";

const EditProfile = () => {
  const { theme } = useContext(ThemeContext);
  const { currentUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || "",
    email: currentUser?.email || "",
    birthday: {
      month: currentUser?.birthday?.split("-")[1] || "January",
      day: currentUser?.birthday?.split("-")[2] || "1",
      year: currentUser?.birthday?.split("-")[0] || "1990",
    },
    username: currentUser?.userName || "",
    country: currentUser?.country || "Israel",
    profilePhoto: "",
    phoneNumber: currentUser?.phoneNumber || "",
  });

  const [profilePhotoURL, setProfilePhotoURL] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to store error messages
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (currentUser?.profilePhoto) {
      setProfilePhotoURL(`${process.env.REACT_APP_API_URL}${currentUser.profilePhoto}`);
    }
  }, [currentUser]);

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

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevState) => ({
        ...prevState,
        profilePhoto: file,
      }));
      setProfilePhotoURL(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    if (formData.username.length < 8) {
      setErrorMessage("Username must be at least 8 characters long.");
      return;
    }

    if (formData.phoneNumber.length < 10 || formData.phoneNumber.length > 15) {
      setErrorMessage("Phone number must be between 10 and 15 digits.");
      return;
    }

    if (!formData.email || !formData.phoneNumber || !formData.fullName) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    const updatedUser = {
      userName: formData.username,
      email: formData.email,
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      birthday: `${formData.birthday.year}-${formData.birthday.month}-${formData.birthday.day}`,
      country: formData.country,
      profilePhoto: formData.profilePhoto,
    };

    await updateUser(currentUser._id, updatedUser);
    navigate("/");
  };

  return (
    <div className={`page ${theme}`}>
      <Container title={"Edit Profile"} containerStyle={"profile-editor-container"}>
        <form className="profile-editor-form-container" onSubmit={handleSubmit}>
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
              type="tel"
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
            {profilePhotoURL && <ProfilePhoto img={profilePhotoURL} profilePhotoStyle="profilePhotoStyle" />}
          </div>
          <div className="buttons-container">
            <GenericButton text="Save Changes" type="submit" onClick={(e) => handleSubmit(e)} />
            <LightButton text="Cancel" link="/" />
          </div>
        </form>
      </Container>
    </div>
  );
};

export default EditProfile;
