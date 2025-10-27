import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import University from "../pages/UniversityProfile"
import Login from "../pages/Login"
import Admin from "../pages/Admin"
import DetailProgramme from "../components/DetailProgramme";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/university" element={<University />} />
         <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          {/* <Route path="/detail-programme" element={<DetailProgramme />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
