// Loader.js
import React from "react";
import { ClipLoader } from "react-spinners";
import "./Loader.scss";

const Loader = ({ loading }) => {
  return (
    <div className="loader">
      <ClipLoader color="#123abc" loading={loading} size={150} />
    </div>
  );
};

export default Loader;
