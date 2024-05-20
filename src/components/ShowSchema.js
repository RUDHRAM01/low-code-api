import React, { useState } from "react";
import "../styles/show.css";
import { useNavigate, useParams } from "react-router-dom";
import moreIcon from "../assets/more.svg";
import editIcon from "../assets/edit.svg";
import addIcon from "../assets/add.png";
import deleteIcon from "../assets/delete.svg";
import { deleteSchemaApi } from "../api/delete/DeleteSchemaApi";
import { Error } from "../apiRes/ErrorCatch";
import toast from "react-hot-toast";
import { getSchemaApi } from "../api/get/GetSchemaApi";

function ShowSchema({ data,setData }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [deleteId, setDeleteId] = useState("");

  const handleDeleteSchema = async () => {
    try {
      await deleteSchemaApi(deleteId);
      toast.success("Schema Deleted Successfully");
      const res = await getSchemaApi(id);
      setData(res.data.message);
      setDeleteId("");
    } catch (error) {
      Error(error);
    }
  };
  return (
    <>
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
              <img src={addIcon} alt="add" height={"20px"} />
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
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
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
                      <button
                        class="dropdown-item"
                        style={{
                          display: "flex",
                          gap: "4px",
                          alignItems: "center",
                        }}
                        onClick={() => {
                          navigate(`/admin/${id}/editSchema/${item._id}`);
                        }}
                      >
                        <img src={editIcon} alt="edit" height={"16px"} />
                        Edit
                      </button>
                    </li>
                    <li>
                      <button
                        class="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        style={{
                          display: "flex",
                          gap: "4px",
                          alignItems: "center",
                        }}
                        onClick={() => {
                          setDeleteId(item._id);
                        }}
                      >
                        <img src={deleteIcon} alt="edit" height={"16px"} />
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
                        <th>Is Required</th>
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
                          <td>{prop.isrequired ? "Yes" : "No"}</td>
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
              Are you sure you want to delete this Schema?
              <p style={{ color: "red", fontWeight: "600" }}>
                If you delete this Schema, all the API's associated with this
                Schema will be deleted.
              </p>
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
                onClick={handleDeleteSchema}
                style={{ background: "red", border: "none" }}
              >
                delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowSchema;
