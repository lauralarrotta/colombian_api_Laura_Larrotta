import React, { useState, useEffect } from "react";
import { fetchRecordCountAirports } from "../../../api/apiService";
import "../presidents/presidents.css";

const Aeropuertos = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getCount = async () => {
      const recordCount = await fetchRecordCountAirports();
      setCount(recordCount);
    };
    getCount();
  }, []);

  return (
    <div className="container">
      <h2>Aeropuertos</h2>
      <p>Total de Aeropuertos: {count}</p>
    </div>
  );
};

export default Aeropuertos;
