import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "./common/TopBar";
import { getProjectByIdApi } from "../api/get/GetSingleProject";
import { getSchemaNameApi } from "../api/get/GetSchemaNameApi";
import { createApi } from "../api/post/CreateApi";

import "../styles/api.css";
import toast from "react-hot-toast";

function CreateApi() {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [schema, setSchema] = useState([]);
  const [api, setApi] = useState({
    schema: "",
    name: "",
    endpoint: "",
    method: "",
  });
  const findName = (id) => {
    const name = schema.find((item) => item._id === id);
    return name?.name;
  };
  const navigate = useNavigate();
  useEffect(() => {
    const calling = async () => {
      try {
        const response = await getProjectByIdApi(id);
        setProject(response.data.message);
      } catch (error) {
        console.log(error);
      }
    };
    calling();
  }, [id]);

  useEffect(() => {
    const calling = async () => {
      try {
        const response = await getSchemaNameApi(id);
        setSchema(response.data.message);
      } catch (error) {
        console.log(error);
      }
    };
    calling();
  }, [id]);

  const handleChange = (e) => {
    setApi({ ...api, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createApi(api,id);
      toast.success('API Created Successfully');
      setApi({
        schema: "",
        name: "",
        endpoint: "",
        method: "",
      });
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  return (
    <div className="create-api-container">
      <TopBar id={id} project={project} path={id} subpath={"createApi"} />
      <div className="create-api">
        <div className="view-header">
          <h4>API's</h4>
          <div style={{ display: "flex", gap: "20px" }}>
            <button
              className="createBtn api-create"
              onClick={() => {
                navigate(`/admin/${id}`);
              }}
            >
              View Schema
            </button>
            <button
              className="createBtn"
              onClick={() => {
                navigate(`/admin/${id}/viewApi`);
              }}
            >
              View API's
            </button>
          </div>
        </div>
        <div>
          <form className="create-api-form">
            <div className="form-group">
              <label htmlFor="api-modal">Select Schema</label>
              <select
                name="schema"
                onChange={handleChange}
                id="api-modal"
                value={api.schema}
              >
                <option value="">select</option>
                {schema.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="api-name">API Name</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                placeholder="Enter API Name"
                value={api.name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="api-endpoint">API Endpoint</label>
              <div class="input-group">
                <span
                  class="input-group-text"
                  id="basic-addon3"
                  style={{ fontSize: "12px" }}
                >
                  {/* https://example.com/users/ */}
                  {`${process.env.REACT_APP_MAIN}/${project.name}/${id}/${findName(api.schema) === undefined ? '' : findName(api.schema)}/`}
                </span>
                <input
                  type="text"
                  id="basic-url"
                  aria-describedby="basic-addon3 basic-addon4"
                  style={{ flexGrow: "1" }}
                  name="endpoint"
                  onChange={handleChange}
                  value={api.endpoint}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="api-method">API Method</label>
              <select
                name="method"
                id="api-method"
                onChange={handleChange}
                value={api.method}
              >
                <option value="">select</option>
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
            <button className="createBtn" onClick={handleSubmit}>Create API</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateApi;
