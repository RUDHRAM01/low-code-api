import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/view-project.css";
import { getProjectByIdApi } from "../api/get/GetSingleProject";
import { Error } from "../apiRes/ErrorCatch";
import BreadCrumb from "./common/BreadCrumb";
import Link from "../assets/link.svg";
import toast from "react-hot-toast";

function ViewProject() {
  const { id } = useParams();
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
  const [tab, setTab] = React.useState("create");
  const [project, setProject] = React.useState({});
  const [name, setName] = React.useState("");
  const [config, setConfig] = React.useState({
    properties: {
      pname: "",
      type: "String",
      isunique: false,
      isref: false,
      refModel: "",
    },
  });
  const [schema, setSchema] = React.useState({
    name: "",
    properties: [],
    project: id,
  });

  const addToSchema = (e) => {
    e.preventDefault();
    setSchema({
      ...schema,
      project: id,
      properties: [...schema.properties, config.properties],
    });
    setConfig({
      properties: {
        pname: "",
        type: "String",
        isrequired: false,
        isunique: false,
        isref: false,
        refModel: "",
      },
    });
    toast.success("Property Added to Schema");
  };

  const handleChange = (e, val) => {
    if (val === "name") {
      setSchema({
        ...schema,
        name: e.target.value,
      });
      setName(e.target.value);
    } else {
      setConfig({
        ...config,
        properties: {
          ...config.properties,
          [e.target.name]: e.target.value === "true" ? true : e.target.value === "false" ? false : e.target.value,
        },
      });
    }

    console.log(config);
  };

  return (
    <div className="view-project-container">
      <div className="view-project-head">
        <div
          style={{
            display: "flex",
            margin: "20px",
            justifyContent: "space-between",
          }}
        >
          <BreadCrumb root="admin" path={`view`} />
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
      <div className="view-project-body">
        <div className="create-schema-container">
          <div className="create-tabs">
            <button
              className="tab"
              style={{
                backgroundColor: tab === "create" ? "#22A91F" : "#fff",
                color: tab === "create" ? "#fff" : "#22A91F",
              }}
              onClick={() => {
                setTab("create");
              }}
            >
              Create Schema
            </button>
            <button
              className="tab"
              style={{
                backgroundColor: tab === "view" ? "#22A91F" : "#fff",
                color: tab === "view" ? "#fff" : "#22A91F",
              }}
              onClick={() => {
                setTab("view");
              }}
            >
              View Schema
            </button>
          </div>
          {tab === "create" && (
            <div className="create-schema-form">
              <h3>Create Schema</h3>
              <form>
                <div className="form-group">
                  <label>Schema Name</label>
                  <input
                    name="name"
                    value={name}
                    onChange={(e) => handleChange(e, "name")}
                    type="text"
                    placeholder="Schema Name"
                  />
                </div>
                <div className="form-group mt-2">
                  <span className="schema-property-head">
                    Schema Properties
                  </span>
                  <div className="schema-property">
                    <div className="form-gr" style={{ flexGrow: "1" }}>
                      <label>Property Name</label>
                      <input
                        value={config.properties.pname}
                        name="pname"
                        onChange={(e) => handleChange(e, "na")}
                        type="text"
                        placeholder="Property Name"
                      />
                    </div>
                    <div className="form-gr" style={{ flexGrow: "1" }}>
                      <label>Property Type</label>
                      <select
                        className=""
                        name="type"
                        value={config.properties.type}
                        onChange={(e) => handleChange(e, "na")}
                        defaultValue={"String"}
                      >
                        <option value="String">String</option>
                        <option value="Number">Number</option>
                        <option value="Boolean">Boolean</option>
                        <option value="Date">Date</option>
                        <option value="Array">Array</option>
                        <option value="Object">Object</option>
                      </select>
                    </div>
                    <div className="form-gr" style={{ flexGrow: "1" }}>
                      <label>Is Ref</label>
                      <select
                        className=""
                        name="isref"
                        value={config.properties.isref}
                        onChange={(e) => handleChange(e, "na")}
                      >
                        <option value={false}>No</option>
                        <option value={true}>Yes</option>
                      </select>
                    </div>
                    {config.properties.isref === false && (
                      <div className="form-gr" style={{ flexGrow: "1" }}>
                        <label>Is Unique</label>
                        <select
                          name="isunique"
                          value={config.properties.isunique}
                          onChange={(e) => handleChange(e, "na")}
                        >
                          <option value={false}>No</option>
                          <option value={true}>Yes</option>
                        </select>
                      </div>
                    )}
                    {config.properties.isref === true && (
                      <div className="form-gr" style={{ flexGrow: "1" }}>
                        <label>Ref Schema</label>
                        <select
                          name="refModel"
                          value={config.properties.refModel}
                          onChange={(e) => handleChange(e, "na")}>
                          <option value="">Select Schema</option>
                          </select>
                      </div>
                    )}
                  
                  </div>
                  <button className="addPropertyBtn" onClick={addToSchema}>
                    Add Property
                  </button>
                </div>
              </form>
            </div>
          )}
          {tab !== "create" && (
            <div className="view-schema">
              <h3>
                Schema Preview{" "}
                {name.length > 0 && (
                  <span className="schema-name">{schema.name}</span>
                )}
              </h3>
              <div className="schema-preview">
                <div className="schema-preview-body">
                  <div className="schema-preview-row">
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Type</th>
                          <th>Is Required</th>
                          <th>Is Unique</th>
                          <th>Is Ref</th>
                          <th>Ref Model</th>
                        </tr>
                      </thead>
                      <tbody>
                        {schema.properties.map((prop, index) => (
                          <tr key={index}>
                            <td>{prop.pname}</td>
                            <td>{prop.type}</td>
                            <td>{prop.isrequired ? "Yes" : "No"}</td>
                            <td>{prop.isunique ? "Yes" : "No"}</td>
                            <td>{prop.isref ? "Yes" : "No"}</td>
                            <td>{prop.refModel}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewProject;
