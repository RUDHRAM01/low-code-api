import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/view-project.css";
import { getProjectByIdApi } from "../api/get/GetSingleProject";
import { Error } from "../apiRes/ErrorCatch";
import BreadCrumb from "./common/BreadCrumb";
import Link from "../assets/link.svg";

function ViewProject() {
  const { id } = useParams();
  const [project, setProject] = React.useState({});

  useEffect(() => {
    const calling = async () => {
      try {
        const res = await getProjectByIdApi(id);
        setProject(res.data.message);
      } catch (err) {
        Error(err);
      }
    };
    calling();
  }, [id]);

  return (
    <div className="view-project-container">
      <div className="view-project-head">
       <div style={{display:"flex",margin:"20px",justifyContent:"space-between"}}>
        <BreadCrumb root="admin" path={`view`} />
        <div className="view-project-nav">
          <button className="btn">Logs</button>
          <button className="btn">Environment</button>
          <button className="btn">Settings</button>
        </div>
       </div>
       <span className="project-head-name">
        {project.name}
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
      <div className="view-project-body">
        <div className="view-pro-b-header">
          <h4>
            Access Point{" "}
            <img
              src={Link}
              alt="link"
              className="sm-icon"
              onClick={() =>
                (window.location = `http://localhost:4000/api/${project.name}/${id}`)
              }
            />
          </h4>
        </div>
      </div>
    </div>
  );
}

export default ViewProject;
