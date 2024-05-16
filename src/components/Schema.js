import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/view-project.css";
import { getProjectByIdApi } from "../api/get/GetSingleProject";
import { Error } from "../apiRes/ErrorCatch";
import { getSchemaApi } from "../api/get/GetSchemaApi";
import ShowSchema from "./ShowSchema";
import TopBar from "./common/TopBar";

function ViewProject() {
  const { id } = useParams();
  const [data, setData] = React.useState([]);

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
  useEffect(() => {
    const calling = async () => {
      try {
        const res = await getSchemaApi(id);
        setData(res.data.message);
      } catch (err) {
        Error(err);
      }
    };
    calling();
  }, [id]);

  const [project, setProject] = React.useState({});

  return (
    <>
      <div className="view-project-container">
        <TopBar project={project} id={id} path={id} />
        <ShowSchema data={data} />
      </div>
    </>
  );
}

export default ViewProject;
