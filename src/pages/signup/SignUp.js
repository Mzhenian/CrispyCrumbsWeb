import React, { useContext, useState } from "react";
import { ThemeContext } from "../../ThemeContext.js";
import DropDownMenu from "../../components/Inputs/DropDownMenu.js";
import { countries } from "../../DB/countries/CountriesListsData.js";
import Container from "../../components/container/Container.js";
import GenericButton from "../../components/buttons/GenericButton.js";
import { AuthContext } from "../../AuthContext.js";
import usersDB from "../../DB/usersDB.json";

const SignUp = () => {
  const { theme } = useContext(ThemeContext);
  const { signup } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    birthday: "",
    username: "",
    password: "",
    password_auth: "",
    country: "Israel",
  });
  const [error, setError] = useState(""); // State to store error messages

  // Function to check if username is available
  const checkUsernameAvailability = (username) => {
    const isUsernameAvailable = !usersDB.users.some((user) => user.userName === username);
    return isUsernameAvailable;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDropDownChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.password_auth) {
      setError("Passwords do not match!");
      return;
    }

    // Check if username already exists
    const isUsernameTaken = !checkUsernameAvailability(formData.username);
    if (isUsernameTaken) {
      setError("Username already exists. Please choose a different one.");
      return;
    }

    // Signup user if all checks pass
    signup({
      userName: formData.username,
      email: formData.email,
      password: formData.password,
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      birthday: formData.birthday,
      country: formData.country,
      profilePhoto: "",
    });
    alert("User registered successfully!");
    // Redirect or any other logic
  };

  return (
    <div className={`page ${theme}`}>
      <Container title={"Sign up"} containerStyle={"signup-container"}>
        <form onSubmit={handleSubmit}>
          {error && <b className={`error ${theme}`}>{error}</b>}
          <div className="field-container">
            <b>Full Name</b>
            <input
              className={`field ${theme}`}
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div className="field-container">
            <b>Email</b>
            <input className={`field ${theme}`} name="email" value={formData.email} onChange={handleInputChange} />
          </div>
          <div className="field-container">
            <b>Birthday</b>
            <input
              className={`field ${theme}`}
              name="birthday"
              value={formData.birthday}
              onChange={handleInputChange}
            />
          </div>
          <div className="field-container">
            <b>Username</b>
            <input
              className={`field ${theme}`}
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="field-container">
            <b>Password</b>
            <input
              className={`field ${theme}`}
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="field-container">
            <b>Confirm Password</b>
            <input
              className={`field ${theme}`}
              name="password_auth"
              type="password"
              value={formData.password_auth}
              onChange={handleInputChange}
            />
          </div>
          <div className="field-container">
            <DropDownMenu
              name="country"
              arr={countries}
              value={formData.country}
              showFlag={true}
              action={handleDropDownChange}
            />
          </div>
          <div className="buttons-container">
            <GenericButton text="Sign up" type="submit" onClick={handleSubmit} />
          </div>
        </form>
      </Container>
    </div>
  );
};

export default SignUp;
