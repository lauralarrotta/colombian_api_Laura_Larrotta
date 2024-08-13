import React, { useState, useEffect } from "react";
import {
  fetchPresidents,
  fetchAirports,
  fetchTouristicAttraction,
  fetchDepartments,
} from "../../api/apiService";

const ResponseTimeComponent = () => {
  const [responseTimes, setResponseTimes] = useState({
    presidents: null,
    airports: null,
    attractions: null,
    departments: null,
  });

  const fetchData = async (fetchFunction) => {
    const startTime = Date.now();
    try {
      await fetchFunction();
      const endTime = Date.now();
      return endTime - startTime;
    } catch (error) {
      console.error(`Error fetching data:`, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      const times = await Promise.all([
        fetchData(fetchPresidents),
        fetchData(fetchAirports),
        fetchData(fetchTouristicAttraction),
        fetchData(fetchDepartments),
      ]);

      setResponseTimes({
        presidents: times[0],
        airports: times[1],
        attractions: times[2],
        departments: times[3],
      });
    };

    fetchAllData();
  }, []);

  return (
    <div>
      <h2>API Response Times</h2>
      <ul>
        <li>
          President:{" "}
          {responseTimes.presidents !== null
            ? `${responseTimes.presidents} ms`
            : "Loading..."}
        </li>
        <li>
          Airport:{" "}
          {responseTimes.airports !== null
            ? `${responseTimes.airports} ms`
            : "Loading..."}
        </li>
        <li>
          Touristic Attraction:{" "}
          {responseTimes.attractions !== null
            ? `${responseTimes.attractions} ms`
            : "Loading..."}
        </li>
        <li>
          Department:{" "}
          {responseTimes.departments !== null
            ? `${responseTimes.departments} ms`
            : "Loading..."}
        </li>
      </ul>
    </div>
  );
};

export default ResponseTimeComponent;
