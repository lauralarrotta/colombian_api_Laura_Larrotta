import React, { useEffect, useState } from "react";
import {
  fetchDepartments,
  fetchTouristicAttraction,
} from "../../../api/apiService";
import { groupTouristAttractions } from "../../../utils/OrganizeTouristic";

const TouristAttractionsByLocation = () => {
  const [groupedData, setGroupedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [departments, setDepartments] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const departmentsData = await fetchDepartments();
        const attractions = await fetchTouristicAttraction();
        setDepartments(
          departmentsData.reduce((acc, dep) => {
            acc[dep.id] = dep.name;
            return acc;
          }, {})
        );

        const grouped = groupTouristAttractions(departmentsData, attractions);
        setGroupedData(grouped);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDepartmentChange = (event) => {
    setSelectedDepartmentId(event.target.value);
    setSelectedCity("all");
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const filteredData = groupedData
    .filter(
      ({ department }) =>
        selectedDepartmentId === "all" ||
        department === departments[selectedDepartmentId]
    )
    .flatMap(({ department, cities }) =>
      cities
        .filter(({ city }) => selectedCity === "all" || city === selectedCity)
        .map(({ city, attractions }) => ({
          department,
          city,
          attractions,
          count: attractions.length, // Conteo de atracciones en la ciudad
        }))
    );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="table-container">
      <h1>Atracciones por Departamento y Ciudad</h1>

      <div className="filters">
        <select
          className="filter-select"
          value={selectedDepartmentId}
          onChange={handleDepartmentChange}
        >
          <option value="all">Todos los Departamentos</option>
          {Object.entries(departments).map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>

        {selectedDepartmentId !== "all" && (
          <select
            className="filter-select"
            value={selectedCity}
            onChange={handleCityChange}
          >
            <option value="all">Todas las Ciudades</option>
            {groupedData
              .find(
                ({ department }) =>
                  department === departments[selectedDepartmentId]
              )
              ?.cities.map(({ city }) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
        )}
      </div>

      {filteredData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Departamento</th>
              <th>Ciudad</th>
              <th>Nombre de la Atracción</th>
              <th>Descripción</th>
              <th>Conteo de Atracciones</th>
              <th>Imagen</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.flatMap(({ department, city, attractions, count }) =>
              attractions.map((attraction) => (
                <tr key={attraction.id}>
                  <td>{department}</td>
                  <td>{city}</td>
                  <td>{attraction.name}</td>
                  <td>{attraction.description}</td>
                  <td>{count}</td>
                  <td>
                    {attraction.images && attraction.images.length > 0 && (
                      <img
                        src={attraction.images[0]}
                        alt={attraction.name}
                        style={{ width: "100px" }}
                      />
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default TouristAttractionsByLocation;
