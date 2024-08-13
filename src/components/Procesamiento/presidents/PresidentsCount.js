import { useState, useEffect } from "react";
import { fetchRecordCountPresidents } from "../../../api/apiService";
import "./presidents.css";

const Presidentes = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getCount = async () => {
      const recordCount = await fetchRecordCountPresidents();
      setCount(recordCount);
    };
    getCount();
  }, []);

  return (
    <div className="container">
      <h2>Presidentes</h2>
      <p>Total de Presidentes: {count}</p>
    </div>
  );
};

export default Presidentes;
