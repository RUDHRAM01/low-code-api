import React from "react";
import SideBar from "./components/common/SideBar";
import { BrowserRouter as Router } from "react-router-dom";
import ToastAlert from "./apiRes/ToastAlert";
import './App.css';

function App() {

  return (
    <>
      <Router>
        <SideBar />
        <ToastAlert />
      </Router>
    </>
  );
}

export default App;
