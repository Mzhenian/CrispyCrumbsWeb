import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { ThemeProvider } from "./ThemeContext";
import reportWebVitals from "./reportWebVitals";
import TopBar from "./components/topBar/TopBar";
import Home from "./pages/home/Home";
import UploadVideo from "./pages/uploadVideo/UploadVideo";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <TopBar />
        <div className="main-body">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/uploadvideo" element={<UploadVideo />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
reportWebVitals();
