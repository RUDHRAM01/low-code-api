import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ViewProject from "../components/ViewProject";

function RouterConfig() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/:id" element={<ViewProject />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default RouterConfig;
