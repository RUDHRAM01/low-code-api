import React, { useEffect } from "react";
import Home from "../../assets/home.svg";
import Analytics from "../../assets/analytics.svg";
import Settings from "../../assets/settings.svg";
import project from "../../assets/project.svg";
import Logo from "../../assets/logo.jpg";
import RouterConfig from "../../routes/RouterConfig";

function SideBar() {
  const [isShow, setIsShow] = React.useState(true);
  useEffect(() => {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/sign-up" ||
      window.location.pathname === "/"
    ) {
      setIsShow(false);
    } else {
      setIsShow(true);
    }
  }, []);

  return (
    <>
      <div className="base">
        {isShow && (
          <div className="side-bar">
            <div>
              <div className="logo">
                <img
                  src={Logo}
                  alt="logo"
                  height={40}
                  style={{ borderRadius: "50%" }}
                />
                <span>Low code api</span>
              </div>
              <div className="container-side">
                <div className="side-bar-item">
                  <img src={Home} alt="home" height={24} />
                  Home
                </div>
                <div className="side-bar-item">
                  <img src={project} alt="settigs" height={24} />
                  Projects
                </div>
                <div className="side-bar-item">
                  <img src={Analytics} alt="Analytics" height={24} />
                  Analytics
                </div>
                <div className="side-bar-item">
                  <img src={Settings} alt="settigs" height={24} />
                  Settings
                </div>
              </div>
            </div>
            <div className="side-bar-bottom"> 
              <img
                src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                alt="profile"
               height={"40px"}
              />
              Profile
            </div>
          </div>
        )}
        <RouterConfig />
      </div>
    </>
  );
}

export default SideBar;
