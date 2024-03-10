import React, { useEffect } from "react";
import SideBar from "../components/common/SideBar";
import AddIcon from "../assets/add.svg";
import Search from "../assets/search.svg";
import LinkIcon from '../assets/link.svg';
import LaunchIcon from "../assets/launch.svg";
import Mongo from "../assets/mongo.svg";
import { getProjectApi } from "../api/get/GetProjectApi";
import { createProjectApi } from "../api/post/CreateProjectApi";
import { Error } from "../apiRes/ErrorCatch";

function AdminDashboard() {
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
      console.log(response.data.message);
    };
    fetchData();
  }, []);

  const createProject = async (e) => {
    e.preventDefault();
    try {
      setConfig((pre) => ({ ...pre, isLoading: true }));
      await createProjectApi(config);
      setConfig((pre) => ({ ...pre, isLoading: false }));
    } catch (err) {
      setConfig((pre) => ({ ...pre, isLoading: false }));
      Error(err);
    }
  };

  return (
    <div className="dashboard">
      <SideBar />
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
        )}
        {!isCreate && (
          <div className="projects-container">
            <div className="search-project-container">
              <img src={Search} alt="search" className="search-icon" />
              <input
                type="text"
                placeholder="Search Project"
                className="search-project"
              />
              <div></div>
            </div>
            <div>
              <span className="project-title">Projects</span>
            </div>
            <div></div>
            <div className="projects">
              {projects.map((project, index) => (
                <div key={index} className="project">
                  <div className="project-name">
                    <p>{project.name}</p>
                    <img src={LinkIcon} alt="link" className="icon" />
                  </div>
                </div>
              ))}
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
