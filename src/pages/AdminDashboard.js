import React, { useEffect } from "react";
import AddIcon from "../assets/add.png";
import Search from "../assets/searchB.svg";
import LinkIcon from "../assets/link.svg";
import mongodbIcon from "../assets/mongodb.svg";
import LaunchIcon from "../assets/launch.svg";
import Mongo from "../assets/mongo.svg";
import { getProjectApi } from "../api/get/GetProjectApi";
import { createProjectApi } from "../api/post/CreateProjectApi";
import { Error } from "../apiRes/ErrorCatch";
import "../styles/admin.css";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [isCreate, setIsCreate] = React.useState(false);
  const [config, setConfig] = React.useState({
    name: "",
    dbUrl: "",
    isLoading: false,
  });
  const [projects, setProjects] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProjectApi();
      setProjects(response.data.message);
    };
    fetchData();
  }, []);

  const createProject = async (e) => {
    e.preventDefault();
    if (config.name.indexOf(" ") !== -1) {
      Error("Project name should not have space");
    } else {
      try {
        setConfig((pre) => ({ ...pre, isLoading: true }));
        await createProjectApi(config);
        setConfig((pre) => ({ ...pre, isLoading: false }));
        setIsCreate(false);
        const response = await getProjectApi();
        setProjects(response.data.message);
      } catch (err) {
        setConfig((pre) => ({ ...pre, isLoading: false }));
        Error(err);
      }
    }
  };

  return (
    <div className="dashboard">
      <div className="admin">
        <div className="nav">
          <span className="title">Admin</span>
          <img
            src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
            alt="Admin"
            height={40}
          />
        </div>
        {!isCreate && (
          <div className="space-between" style={{ justifyContent: "center" }}>
            <div
              class="search-container"
              style={{ background: "none", margin: 0 }}
            >
              <input
                type="text"
                placeholder="Search"
                className="search-input"
              />
              {/* <i className="fas fa-search search-icon"></i> */}
              <img
                src={Search}
                alt="search"
                className="search-icon"
                height={"20px"}
              />
            </div>
            <div className="create-project">
              <button
                onClick={() => {
                  setIsCreate(true);
                }}
              >
                <img src={AddIcon} alt="add" className="icon" />
                Create Project
              </button>
            </div>
          </div>
        )}
        {!isCreate && (
          <div className="projects-container">
            <div className="tech">
              <img
                src={mongodbIcon}
                alt="mongoDB"
                className="icon"
                style={{ border: "2px solid white", borderRadius: "50%" }}
              />
            </div>
            <div className="three-dot">
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"20px",background:"#fff",padding:"10px"}}>
              <div>
                <span className="project-title">Projects</span>
              </div>
              <div className="projects">
                {projects.map((project, index) => (
                  <button onClick={() => navigate(`/admin/${project._id}`)}>
                    <div key={index} className="project">
                      <div className="project-name">
                        <p>{project.name}</p>
                        <img src={LinkIcon} alt="link" className="icon" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        {isCreate && (
          <div className="create-project-form">
            <div className="create-title">
              <span>Create Project</span>
              <img src={LaunchIcon} alt="create" className="icon" />
            </div>
            <hr className="hr" />
            <form onSubmit={createProject}>
              <div className="form">
                <div className="form-group">
                  <label htmlFor="name">Project Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="name"
                    required
                    onChange={(e) =>
                      setConfig((pre) => ({ ...pre, name: e.target.value }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label className="connect" htmlFor="name">
                    Connect to DataBase (
                    <img src={Mongo} alt="mongoDB" style={{ height: "60px" }} />
                    )
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="database url"
                    required
                    onChange={(e) =>
                      setConfig((pre) => ({ ...pre, dbUrl: e.target.value }))
                    }
                    disabled={config.name.length === 0}
                  />
                </div>
                <div className="create-project-gr-btn">
                  <button type="submit">
                    {config.isLoading ? "Creating..." : "Create"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreate(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
