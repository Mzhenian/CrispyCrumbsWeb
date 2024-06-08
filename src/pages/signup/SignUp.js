import React, { useContext, useState } from "react";
import { ThemeContext } from "../../ThemeContext.js";
import DropDownMenu from "../../components/Inputs/DropDownMenu.js";
import { countries } from "../../DB/countries/CountriesListsData.js";
import Container from "../../components/container/Container.js";
import GenericButton from "../../components/buttons/GenericButton.js";

const SignUp = () => {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    birthday: "",
    username: "",
    password: "",
    password_auth: "",
    destination: "Israel",
  });

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
    console.log("Form submitted:", formData);
    // Add your form submission logic here
    // window.location.href = `${serverLink}?name=${formData.links}`;
  };

  return (
    <div className={`page ${theme}`}>
      <Container title={"Sign up"} containerStyle={"signup-container"}>
        <form onSubmit={handleSubmit}>
          <div className="field-container">
            <b>Full name</b>
            <input
              className={`field ${theme}`}
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div className="field-container">
            <b>Phone Number</b>
            <input
              className={`field ${theme}`}
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
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
            <b>Authenticate password</b>
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
              name="destination"
              arr={countries}
              value={formData.destination}
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
