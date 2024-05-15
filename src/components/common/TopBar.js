import React from "react";
import BreadCrumb from "./BreadCrumb";
import Link from "../../assets/link.svg";

function TopBar({ project, id, path, subpath }) {
  return (
    <>
      <div className="view-project-head">
        <div
          style={{
            display: "flex",
            margin: "20px",
            justifyContent: "space-between",
          }}
        >
          <BreadCrumb root="admin" path={path} subpath={subpath}/>
          <div className="view-project-nav">
            <button className="btn">Logs</button>
            <button className="btn">Environment</button>
            <button className="btn">Settings</button>
          </div>
        </div>
        <span className="project-head-name">
          {project.name}
          <img
            src={Link}
            alt="link"
            className="sm-icon"
            onClick={() =>
              (window.location = `http://localhost:4000/api/${project.name}/${id}`)
            }
          />
        </span>
      </div>
      <div className="view-project-process">
        <div class="projectProcess">
          <div class="processStatus">
            <div class="completed">
              <span class="dot"></span>
            </div>
            <p className="process-title">Create Project</p>
          </div>
          <div class="processStatus">
            <div class="completed">
              <span class="dot"></span>
            </div>
            <p className="process-title">Create Schema</p>
          </div>
          <div class="processStatus">
            <div class="completed">
              <span class="dot"></span>
            </div>
            <p className="process-title">Create API's</p>
          </div>

          <div class="processStatus">
            <div class="completed">
              <span class="dot"></span>
            </div>
            <p className="process-title">Test</p>
          </div>

          <div class="processLine"></div>
        </div>
      </div>
    </>
  );
}

export default TopBar;
