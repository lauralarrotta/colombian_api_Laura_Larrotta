import { useEffect, useState } from "react";
import CardAirport from "../../Card/CardAirports";
import { fetchAirports } from "../../../api/apiService";
import Airports from "./AirportsCount";

const AirportsList = () => {
  const [airports, setAirports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [filteredAirports, setFilteredAirports] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAirports();
        console.log("Fetched airports data:", data);

        const uniqueAirports = Array.from(
          new Set(data.map((airport) => airport.name))
        ).map((name) => data.find((airport) => airport.name === name));
        setAirports(uniqueAirports);
      } catch (error) {
        console.error("Error fetching airports data:", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    // Extract unique cities and departments for filter options
    Array.from(new Set(airports.map((airport) => airport.city?.name))).filter(
      Boolean
    );
    Array.from(
      new Set(airports.map((airport) => airport.department?.name))
    ).filter(Boolean);

    // Filter airports based on search term, selected type, city, and department
    const result = airports.filter((airport) => {
      const matchesSearch = airport.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCity =
        selectedCity === "All" ||
        (airport.city && airport.city.name === selectedCity);
      const matchesDepartment =
        selectedDepartment === "All" ||
        (airport.department && airport.department.name === selectedDepartment);
      return matchesSearch && matchesCity && matchesDepartment;
    });

    setFilteredAirports(result);
  }, [searchTerm, selectedCity, selectedDepartment, airports]);

  // Extract unique cities and departments for filter options
  const cities = Array.from(
    new Set(airports.map((airport) => airport.city?.name))
  ).filter(Boolean);
  const departments = Array.from(
    new Set(airports.map((airport) => airport.department?.name))
  ).filter(Boolean);

  return (
    <div className="records-list">
      <Airports />
      <div className="filters">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search airports..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* City filter */}
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="All">All Cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        {/* Department filter */}
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="All">All Departments</option>
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
      </div>

      {filteredAirports.length > 0 ? (
        filteredAirports.map((airport) => (
          <CardAirport
            key={airport.id}
            name={airport.name}
            description={
              airport.department?.description || "No description available"
            }
            imageUrl={airport.imageUrl || "default-image-url.jpg"} // If applicable
          />
        ))
      ) : (
        <p>No airports data available</p>
      )}
    </div>
  );
};

export default AirportsList;
