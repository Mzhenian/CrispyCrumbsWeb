import React, { useContext, useState } from "react";
import { ThemeContext } from "../../ThemeContext.js";
import Container from "../../components/container/Container.js";
import GenericButton from "../../components/buttons/GenericButton.js";
import LightButton from "../../components/buttons/LightButton.js";

const LoginForm = () => {
  const { theme } = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
      <Container title={"Log in"} containerStyle={"login-container"}>
        <form onSubmit={handleSubmit}>
          <div className="field-container">
            <p>Username</p>
            <input
              className={`field ${theme}`}
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="field-container">
            <p>Password</p>
            <input
              className={`field ${theme}`}
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="buttons-container">
            <GenericButton text="Log in" type="submit" onClick={handleSubmit} />
            <LightButton text="Signup" link="./signup" />
          </div>
        </form>
      </Container>
    </div>
  );
};

export default LoginForm;
