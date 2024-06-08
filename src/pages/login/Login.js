import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../ThemeContext.js";
import Container from "../../components/container/Container.js";
import GenericButton from "../../components/buttons/GenericButton.js";
import LightButton from "../../components/buttons/LightButton.js";
import { AuthContext } from "../../AuthContext";
import "./login.css";

const Login = () => {
  const { theme } = useContext(ThemeContext);
  const { login } = useContext(AuthContext);

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
    if (login(formData.username, formData.password)) {
      alert("Login successful!");
      // Redirect or any other logic
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className={`page ${theme}`}>
      <Container title={"Log in"} containerStyle={"login-container"}>
        <form onSubmit={handleSubmit}>
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
          <div className="linear-layout">
            <div>
              <b>Remember me</b>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
              />
            </div>
            <Link className={theme} to="./forgotpassword">
              <b>I forgot my password</b>
            </Link>
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

export default Login;