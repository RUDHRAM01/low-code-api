import React, { useEffect, useState } from "react";
import "../styles/api.css";
import { useNavigate, useParams } from "react-router-dom";
import { getApi } from "../api/get/GetApi";

function ViewApi({project}) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [userApi, setApis] = useState([]);
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
  return (
    <div className="view-api-container">
      <div className="view-header">
        <h4>API's</h4>
        <div style={{ display: "flex", gap: "20px" }}>
          <button className="createBtn api-create"
            onClick={() => {
              navigate(`/admin/${id}`);
            }}
          >View Schema</button>
          <button className="createBtn"
            onClick={() => {
              navigate(`/admin/${id}/createApi`);
            }}
          >Create API's</button>
        </div>
      </div>
      <div className="view-api">
        {userApi.map((item, index) => {
            return (
              <div key={index} className="apis">
                <h5>{item.name}</h5>
                <div className="singleApi">
                  <a href={`${process.env.REACT_APP_MAIN}/${project.name}/${id}/${item.endpoint}`} target="_blank" rel="noreferrer" style={{textDecoration:"none",color:"white"}}>
                    {
                     `${process.env.REACT_APP_MAIN}/${project.name}/${id}/${item.endpoint}`
                    }
                  </a>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default ViewApi;
