import React from "react";
import { Link } from "react-router-dom";

function BreadCrumb(props) {
  return (
    <div className="breadCrumb">
      <span>
        <Link
          to={`/${props.root}`}
          style={{ textDecoration: "none", color: "#3498db" }}
        >
          {props?.root}
        </Link>
      </span>
      /
      <span>
        <Link
          to={`/${props.root}/${props?.path}`}
          style={{
            textDecoration: "none",
            color: props?.subpath ? "#3498db" : "black",
          }}
        >
          {props?.path}
        </Link>
      </span>
      {props?.subpath && <span>/{props?.subpath}</span>}
    </div>
  );
}

export default BreadCrumb;
