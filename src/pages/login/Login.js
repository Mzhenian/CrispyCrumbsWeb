import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext.js";
import Container from "../../components/container/Container.js";
import GenericButton from "../../components/buttons/GenericButton.js";
import LightButton from "../../components/buttons/LightButton.js";
import { AuthContext } from "../../contexts/AuthContext.js";
import "./Login.css";
import OnOffToggle from "../../components/Inputs/toggle/OnOffToggle.js";

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const { login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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
    const { username, password } = formData;
    if (login(username, password)) {
      const targetRoute = "/";
      navigate(targetRoute);
    } else {
      setErrorMessage("Invalid username or password");
      setFormData({ ...formData, password: "" }); // Clear password field
    }
  };

  return (
    <div className={`page ${theme}`}>
      <Container title={"Log in"} containerStyle={"login-container"}>
        {errorMessage && <b className={`error ${theme}`}>{errorMessage}</b>}
        <form onSubmit={handleSubmit}>
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
            <b>Password</b>
            <input
              className={`input-field ${theme}`}
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="linear-layout-1">
            <div className="linear-layout-2">
              <b>Remember me</b>
              <OnOffToggle
                name="rememberMe"
                value={formData.rememberMe}
                action={() => setFormData({ ...formData, rememberMe: !formData.rememberMe })}
              />
            </div>
            <Link className={theme} to="./forgotpassword">
              <b>I forgot my password</b>
            </Link>
          </div>
          <div className="buttons-container">
            <GenericButton text="Log in" type="submit" onClick={handleSubmit} />
            <LightButton text="Signup" link="/signup" />
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Login;