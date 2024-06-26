import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Schema from "../components/Schema";
import CreateSchema from "../components/CreateSchema";
import CreateApi from "../components/CreateApi";
import Api from "../components/Api";
import EditSchema from "../components/EditSchema";
import Profile from "../components/Profile";


function RouterConfig() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/projects" element={<AdminDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/:id" element={<Schema />} />
        <Route path="/admin/:id/addSchema" element={<CreateSchema />} />
        <Route path="/admin/:id/createApi" element={<CreateApi />} />
        <Route path="/admin/:id/editSchema/:editId" element={<EditSchema />} />
        <Route path="/admin/:id/viewApi" element={<Api />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default RouterConfig;
