import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "../contexts/ThemeContext.js";
import TopBar from "../components/topBar/TopBar.js";
import Home from "../pages/home/Home.js";
import UploadVideo from "../pages/uploadVideo/UploadVideo.js";
import SignUp from "../pages/signup/SignUp.js";
import Login from "../pages/login/Login.js";
import WatchVideo from "../pages/watchvideo/WatchVideo.js";
import Search from "../pages/search/Search.js";
import UserProfile from "../pages/userProfile/UserProfile.js";
import { AuthProvider } from "../contexts/AuthContext.js";
import { VideoProvider } from "../contexts/VideoContext.js";
import { ViewProvider } from "../contexts/ViewContext.js";

import PrivateRoute from "../routes/PrivateRoute.js";
import SignedRoute from "../routes/SignedRoute.js";
import EditVideo from "../pages/editVideo/EditVideo.js";
import NotFound from "../routes/NotFoundRoute.js";
import EditProfile from "../pages/editProfile/EditProfile.js";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <VideoProvider>
              <ViewProvider>
                <TopBar />
                <div className="main-body">
                  <Routes>
                    <Route index element={<Home />} />
                    <Route path="/uploadvideo" element={<PrivateRoute element={<UploadVideo />} />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/signup" element={<SignedRoute element={<SignUp />} />} />
                    <Route path="/login" element={<SignedRoute element={<Login />} />} />
                    <Route path="/watch/:videoId" element={<WatchVideo />} />
                    <Route path="/crumb/:userId" element={<UserProfile />} />
                    <Route path="/edit/:videoId" element={<EditVideo />} />
                    <Route path="/crumb/edit/" element={<EditProfile />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </ViewProvider>
            </VideoProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
