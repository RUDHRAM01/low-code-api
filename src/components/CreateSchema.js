import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { createSchemaApi } from "../api/post/CreateSchemaApi";
import { useParams } from "react-router-dom";
import TopBar from "./common/TopBar";
import { getProjectByIdApi } from "../api/get/GetSingleProject";

function CreateSchema() {
  const { id } = useParams();
  const [tab, setTab] = React.useState("create");
  const [name, setName] = React.useState("");
  const [project, setProject] = React.useState({});
  const [config, setConfig] = React.useState({
    properties: {
      pname: "",
      type: "String",
      isunique: false,
      isref: false,
      isrequired: false,
      refModel: "",
    },
  });
  const [schema, setSchema] = React.useState({
    name: "",
    properties: [],
  });

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

  const addToSchema = (e) => {
    e.preventDefault();
    if (schema.name.length === 0) {
      return toast.error("Schema Name is Required");
    }
    if (config.properties.pname.length === 0) {
      return toast.error("Property Name is Required");
    }
    if (config.properties.isref && config.properties.refModel.length === 0) {
      return toast.error("Ref Model is Required");
    }
    setSchema({
      ...schema,
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
          [e.target.name]:
            e.target.value === "true"
              ? true
              : e.target.value === "false"
              ? false
              : e.target.value,
        },
      });
    }
  };

  const handleCreateSchema = async (e) => {
    e.preventDefault();
    if (schema.name.length === 0) {
      return toast.error("Schema Name is Required");
    }
    if (schema.properties.length === 0) {
      return toast.error("Add Properties to Schema");
    }
    try {
      await createSchemaApi(schema,id);
      toast.success("Schema Created Successfully");
    } catch (err) {
      Error(err);
    }
  };
  return (
    <>
      <div className="create-schema-main">
        <TopBar id={id} project={project} path={id} subpath={"addSchema"} />
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
                            onChange={(e) => handleChange(e, "na")}
                          >
                            <option value="">Select Schema</option>
                          </select>
                        </div>
                      )}
                    </div>
                    <button className="addPropertyBtn" onClick={addToSchema}>
                      Add Property
                    </button>
                    <button
                      type="button"
                      className="addPropertyBtn"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      style={{
                        border: "1px solid #3498db",
                        color: "#3498db",
                        background: "none",
                      }}
                    >
                      Create Schema
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
                            <th>Is Unique</th>
                            <th>Is Required</th>
                            <th>Is Ref</th>
                            <th>Ref Model</th>
                          </tr>
                        </thead>
                        <tbody>
                          {schema.properties.map((prop, index) => (
                            <tr key={index}>
                              <td>{prop.pname}</td>
                              <td>{prop.type}</td>
                              <td>{prop.isunique ? "Yes" : "No"}</td>
                              <td>{prop.isrequired ? "Yes" : "No"}</td>
                              <td>{prop.isref ? "Yes" : "No"}</td>
                              <td>{prop.refModel.length > 0 ? prop.refModel : "N/A"}</td>
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
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Confirmation
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                Are you sure you want to create this Schema?
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={handleCreateSchema}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateSchema;
