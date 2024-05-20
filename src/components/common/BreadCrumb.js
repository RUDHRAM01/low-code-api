import React from "react";
import { Link } from "react-router-dom";

function BreadCrumb(props) {
  return (
    <div className="breadCrumb">
      <span>
        <Link
          to={`/${props.root}`}
          style={{ textDecoration: "none", color: "#8cb5ed",fontWeight:"bold" }}
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
            color: props?.subpath ? "#8cb5ed" : "black",
            fontWeight: props?.subpath ? "bold" : "normal",
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
