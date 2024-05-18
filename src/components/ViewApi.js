import React, { useEffect, useState } from "react";
import "../styles/api.css";
import { useNavigate, useParams } from "react-router-dom";
import { getApi } from "../api/get/GetApi";
import deleteIcon from "../assets/delete.svg";
import copyIcon from "../assets/copy.svg";
import searchIcon from "../assets/searchB.svg";
import { getSchemaNameApi } from "../api/get/GetSchemaNameApi";

function ViewApi({ project }) {
  const navigate = useNavigate();
  const [schema, setSchema] = useState([]);
  const { id } = useParams();
  const [userApi, setApis] = useState([]);
  const calculateHeight = () => {
    const viewApi = document.querySelector(".view-project-process");
    const height = viewApi?.offsetHeight;
    return height + "px";
  };
  calculateHeight();
  useEffect(() => {
    const calling = async () => {
      try {
        const res = await getApi(id);
        setApis(res.data.message);
        console.log(res.data.api);
      } catch (err) {
        Error(err);
      }
    };
    calling();
  }, [id]);

  const findName = (id) => {
    const name = schema.find((item) => item._id === id);
    return name?.name;
  };

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
  return (
    <div className="view-api-container">
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
              navigate(`/admin/${id}/createApi`);
            }}
          >
            Create API's
          </button>
        </div>
      </div>
      <div className="sticky" style={{ top: calculateHeight() }}>
        <div class="search-container">
          <input type="text" placeholder="Search" className="search-input" />
          {/* <i className="fas fa-search search-icon"></i> */}
          <img
            src={searchIcon}
            alt="search"
            className="search-icon"
            height={"20px"}
          />
        </div>
      </div>
      <div className="view-api">
        {userApi.map((item, index) => {
          return (
            <div key={index} className="apis">
              <div className="space-between">
                <div style={{display:"flex",flexDirection:"column"}}>
                  <h5>{item.name}</h5>
                  <div style={{display:"flex",gap:"4px"}}>
                    <span className="circle-chip">{item.method}</span>
                    <span className="circle-chip">{findName(item.schema)}</span>
                  </div>
                </div>
                <div className="space-between">
                  <img src={deleteIcon} alt="edit" height={"24px"} />
                  <img src={copyIcon} alt="edit" height={"24px"} />
                </div>
              </div>
              <div className="singleApi">
                <a
                  href={`${process.env.REACT_APP_MAIN}/${project.name}/${id}/${item.endpoint}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {`${process.env.REACT_APP_MAIN}/${project.name}/${id}/${item.endpoint}`}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ViewApi;
