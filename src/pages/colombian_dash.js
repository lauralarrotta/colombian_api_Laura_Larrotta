import React from "react";
import Tabs from "../components/Tabs/Tabs";
import ResponseTimeComponent from "../components/ApiResponse/Response";

const ColombiaDash = () => {
  return (
    <div>
      <h1 className="title">Bienvenido a Colombia Dash</h1>
      <ResponseTimeComponent />
      <Tabs />
    </div>
  );
};
export default ColombiaDash;
