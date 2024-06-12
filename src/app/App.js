import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "../ThemeContext";
import TopBar from "../components/topBar/TopBar";
import Home from "../pages/home/Home";
import UploadVideo from "../pages/uploadVideo/UploadVideo.js";
import SignUp from "../pages/signup/SignUp";
import Login from "../pages/login/Login";
import WatchVideo from "../pages/watchvideo/WatchVideo.js";
import { AuthProvider } from "../contexts/AuthContext.js";
import { VideoProvider } from "../contexts/VideoContext.js";
import PrivateRoute from "../PrivateRoute";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <VideoProvider>
              <TopBar />
              <div className="main-body">
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="/uploadvideo" element={<PrivateRoute element={<UploadVideo />} />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/watch/:videoId" element={<WatchVideo />} />
                </Routes>
              </div>
            </VideoProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
