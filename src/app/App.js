import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "../ThemeContext";
import TopBar from "../components/topBar/TopBar";
import Home from "../pages/home/Home";
import UploadVideo from "../pages/uploadVideo/UploadVideo";
import SignUp from "../pages/signup/SignUp";
import Login from "../pages/login/Login";

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <BrowserRouter>
          <TopBar />
          <div className="main-body">
            <Routes>
              <Route index element={<Home />} />
              <Route path="/uploadvideo" element={<UploadVideo />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
