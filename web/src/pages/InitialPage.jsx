import React from "react";
import Camera from "../components/Camera";
import { Link } from "react-router";

const InitialPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Camera />
    </div>
  );
};

export default InitialPage;
