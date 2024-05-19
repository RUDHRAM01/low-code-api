import React, { useEffect, useState } from "react";
import BreadCrumb from "./common/BreadCrumb";
import { useParams } from "react-router-dom";
import "../styles/editSchema.css";
import { getSchemaByIdApi } from "../api/get/GetSchemaByIdApi";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";
import toast from "react-hot-toast";
import { updateSchemaApi } from "../api/put/UpdateSchemaApi";

function EditSchema() {
  const { id, editId } = useParams();
  const [schema, setSchema] = useState([]);
  const [properties, setProperties] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [edit, setEdit] = useState(false);
  const [config, setConfig] = useState({
    pname: "",
    type: "",
    isrequired: false,
    isunique: false,
    isref: false,
    refModel: "",
  });

  useEffect(() => {
    const calling = async () => {
      try {
        const response = await getSchemaByIdApi(editId);
        setSchema(response.data.message);
        setProperties(response.data.message.properties);
      } catch (error) {
        console.log(error);
      }
    };
    calling();
  }, [editId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig((prev) => ({
      ...prev,
      [name]: value === "true" ? true : value === "false" ? false : value,
    }));
  };

  const addToSchema = (e) => {
    e.preventDefault();
    if (!config.pname || !config.type) {
      return toast.error("Please fill all the fields");
    }
    if (config.isref && !config.refModel) {
      return toast.error("Please select ref model");
    }
    setProperties((prev) => [...prev, config]);
    setConfig({
      pname: "",
      type: "",
      isrequired: false,
      isunique: false,
      isref: false,
      refModel: "",
    });
  };

  const updateSchema = async (e) => {
    e.preventDefault();
    if (!config.pname || !config.type) {
      return toast.error("Please fill all the fields");
    }
    if (config.isref && !config.refModel) {
      return toast.error("Please select ref model");
    }
    setEdit(false);
    properties[editIndex] = config;
    setProperties(properties);

    setConfig({
      pname: "",
      type: "",
      isrequired: false,
      isunique: false,
      isref: false,
      refModel: "",
    });
  };

  const removeProperty = (index) => {
    const newProperties = properties.filter((_, i) => i !== index);
    setProperties(newProperties);
  };

  const editProperty = (index) => {
    setEdit(true);
    setEditIndex(index);
    setConfig(properties[index]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateSchemaApi(properties, editId);
      toast.success("Schema Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="editSchema-container">
      <div className="space-between">
        <BreadCrumb root="admin" path={id} subpath={`editSchema/${editId}`} />
        <button className="saveBtn" onClick={handleSave}>
          Save
        </button>
      </div>
      <div className="editSchema-Form">
        <form>
          <div className="form-group mt-2">
            <span className="schema-property-head">Schema Properties</span>
            <div className="schema-property">
              <div className="form-gr" style={{ flexGrow: "1" }}>
                <label>Property Name</label>
                <input
                  value={config.pname}
                  name="pname"
                  onChange={handleChange}
                  type="text"
                  placeholder="Property Name"
                />
              </div>
              <div className="form-gr" style={{ flexGrow: "1" }}>
                <label>Property Type</label>
                <select
                  className=""
                  name="type"
                  value={config.type}
                  onChange={handleChange}
                  defaultValue={"String"}
                >
                  <option value="">select</option>
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
                  value={config.isref}
                  onChange={handleChange}
                >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              {config.isref === false && (
                <div className="form-gr" style={{ flexGrow: "1" }}>
                  <label>Is Unique</label>
                  <select
                    name="isunique"
                    value={config.isunique}
                    onChange={handleChange}
                  >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div>
              )}
              {config.isref === true && (
                <div className="form-gr" style={{ flexGrow: "1" }}>
                  <label>Ref Schema</label>
                  <select
                    name="refModel"
                    value={config.refModel}
                    onChange={handleChange}
                  >
                    <option value="">Select Schema</option>
                  </select>
                </div>
              )}
            </div>
            <button
              className="addPropertyBtn"
              onClick={edit ? updateSchema : addToSchema}
            >
              {edit ? "Update Property" : "Add Property"}
            </button>
          </div>
        </form>
      </div>
      <div className="editSchema-main">
        <h4>Edit Schema {`(${schema.name})`}</h4>
        <div>
          <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>Value Type</th>
                <th>Is Required</th>
                <th>Is Unique</th>
                <th>Is Ref</th>
                <th>Ref Model</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((item, index) => (
                <tr key={index}>
                  <td>{item.pname}</td>
                  <td>{item.type}</td>
                  <td>{item.isrequired ? "Yes" : "No"}</td>
                  <td>{item.isunique ? "Yes" : "No"}</td>
                  <td>{item.isref ? "Yes" : "No"}</td>
                  <td>{item.refmodel}</td>
                  <td
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <img
                      src={editIcon}
                      alt="edit"
                      height={"20px"}
                      style={{ cursor: "pointer" }}
                      onClick={() => editProperty(index)}
                    />
                    <img
                      src={deleteIcon}
                      alt="delete"
                      height={"20px"}
                      style={{ cursor: "pointer" }}
                      onClick={() => removeProperty(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EditSchema;
