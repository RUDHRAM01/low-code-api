import React from "react";
import "../styles/profile.css";

function Profile() {
  return (
    <div className="profileContainer">
      <div className="cover-pic"></div>
      <div className="user-profile-pic">
        <img
          src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
          alt="profile"
          className="profile-pic"
        />
      </div>
      <div className="user-details">
        <h1 className="user-name">John Doe</h1>
        <p className="user-email">
          <span className="email-icon">
            📧 {JSON.parse(localStorage.getItem("user"))?.user}
          </span>
        </p>
        <div className="form-group">
          <label for="username">Old Password</label>
          <input type="password" placeholder="Old Password" id="prePassword" />
        </div>
        <div className="form-group">
          <label for="username">New Password</label>
          <input type="password" placeholder="New Password" id="newPassword" />
        </div>
        <button className="btn mt-4 updateBtn" style={{color:"#fff"}}>Change Password</button>
      </div>
    </div>
  );
}

export default Profile;
