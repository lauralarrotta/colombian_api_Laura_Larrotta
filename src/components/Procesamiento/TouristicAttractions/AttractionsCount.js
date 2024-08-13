import React, { useState, useEffect } from "react";
import { fetchRecordCountAttractions } from "../../../api/apiService";

const Attractions = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getCount = async () => {
      const recordCount = await fetchRecordCountAttractions();
      setCount(recordCount);
    };
    getCount();
  }, []);

  return (
    <div className="container">
      <h2>Atracciones Turísticas</h2>
      <p>Total de Atracciones: {count}</p>
    </div>
  );
};

export default Attractions;
