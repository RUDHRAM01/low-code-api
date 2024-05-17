import React from "react";
import "../styles/show.css";
import { useNavigate, useParams } from "react-router-dom";
import moreIcon from "../assets/more.svg";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";

function ShowSchema({ data }) {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div className="view-schema">
      <div className="view-header">
        <h4>Schema</h4>
        <div style={{ display: "flex", gap: "20px" }}>
          <button
            className="createBtn api-create"
            onClick={() => {
              navigate(`/admin/${id}/viewApi`);
            }}
          >
            View API's
          </button>
          <button
            className="createBtn"
            onClick={() => {
              navigate("./addSchema");
            }}
          >
            Add New Schema
          </button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {data?.map((item, index) => {
          return (
            <div key={index} className="schemas">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h5>{item.name}</h5>
                <img
                  src={moreIcon}
                  alt="more"
                  height={"26px"}
                  class="btn btn-secondary dropdown-toggle"
                  data-bs-toggle="dropdown"
                />
                <ul class="dropdown-menu">
                  <li>
                    <button class="dropdown-item" style={{display:"flex",gap:"4px",alignItems:"center"}}>
                      <img src={editIcon} alt="edit" height={"16px"}/>
                      Edit
                    </button>
                  </li>
                  <li>
                    <button class="dropdown-item" style={{display:"flex",gap:"4px",alignItems:"center"}}>
                    <img src={deleteIcon} alt="edit" height={"16px"}/>
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Is Unique</th>
                      <th>Is Ref</th>
                      <th>Ref Model</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.properties.map((prop, index) => (
                      <tr key={index}>
                        <td>{prop.pname}</td>
                        <td>{prop.type}</td>
                        <td>{prop.isunique ? "Yes" : "No"}</td>
                        <td>{prop.isref ? "Yes" : "No"}</td>
                        <td>
                          {prop.refModel.length > 0 ? prop.refModel : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ShowSchema;
