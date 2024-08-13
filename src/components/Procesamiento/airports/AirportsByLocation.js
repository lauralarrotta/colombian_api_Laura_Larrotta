import React, { useEffect, useState } from "react";
import {
  fetchDepartments,
  fetchAirports,
  fetchDepartmentById,
} from "../../../api/apiService";
import { groupAirports } from "../../../utils/Airports";

const AirportsByLocation = () => {
  const [groupedData, setGroupedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedName, setSelectedName] = useState("");
  const [departments, setDepartments] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const departmentsData = await fetchDepartments();
        const airports = await fetchAirports();
        setDepartments(
          departmentsData.reduce((acc, dep) => {
            acc[dep.id] = dep.name;
            return acc;
          }, {})
        );

        const grouped = groupAirports(departmentsData, airports);
        setGroupedData(grouped);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedDepartmentId !== "all") {
      const fetchDepartment = async () => {
        try {
          const department = await fetchDepartmentById(selectedDepartmentId);
          console.log("Fetched Department:", department); // Mensaje de depuración
        } catch (error) {
          setError(error.message);
        }
      };
      fetchDepartment();
    }
  }, [selectedDepartmentId]);

  const handleDepartmentChange = (event) => {
    setSelectedDepartmentId(event.target.value);
    setSelectedCity("all");
    setSelectedName("");
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
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
        .flatMap(({ city, types }) =>
          types.map(({ type, airports }) => ({
            type,
            count: airports.filter((airport) =>
              airport.name.toLowerCase().includes(selectedName.toLowerCase())
            ).length,
            airports: airports.filter((airport) =>
              airport.name.toLowerCase().includes(selectedName.toLowerCase())
            ),
            city,
            department,
          }))
        )
    );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="table-container">
      <h1>Aeropuertos por Departamento, Ciudad </h1>

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
          <>
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

            <input
              type="text"
              className="filter-input"
              placeholder="Buscar por nombre de aeropuerto"
              value={selectedName}
              onChange={handleNameChange}
            />
          </>
        )}
      </div>

      {filteredData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Departamento</th>
              <th>Ciudad</th>
              <th>Tipo</th>
              <th>Nombre del Aeropuerto</th>
              <th>Conteo</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(({ department, city, type, airports, count }) =>
              airports.map((airport) => (
                <tr key={`${department}-${city}-${type}-${airport.name}`}>
                  <td>{department}</td>
                  <td>{city}</td>
                  <td>{type}</td>
                  <td>{airport.name}</td>
                  <td>{count}</td>
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

export default AirportsByLocation;
