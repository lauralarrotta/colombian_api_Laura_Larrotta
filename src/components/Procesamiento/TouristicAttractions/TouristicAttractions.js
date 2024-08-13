import { fetchTouristicAttraction } from "../../../api/apiService";
import { useEffect, useState } from "react";
import Attractions from "./AttractionsCount";
import CardAttractions from "../../Card/CardAttractions";

const AllAttractionsList = () => {
  const [attractions, setAttractions] = useState([]);
  const [filteredAttractions, setFilteredAttractions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        // Fetch attractions
        const attractionsData = await fetchTouristicAttraction();
        setAttractions(attractionsData);

        // Extract unique cities from attractions
        const uniqueCities = Array.from(
          new Set(attractionsData.map((attraction) => attraction.city?.id))
        ).map(
          (id) =>
            attractionsData.find((attraction) => attraction.city?.id === id)
              .city
        );
        Array.from(
          new Set(
            attractionsData.map((attraction) => attraction.city?.departmentId)
          )
        ).map((id) => {
          const city = attractionsData.find(
            (attraction) => attraction.city?.departmentId === id
          )?.city;

          return {
            id: city?.departmentId,
            name: city?.department?.name || "Unknown",
          };
        });

        setCities(uniqueCities);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const filterData = () => {
      let result = attractions;

      if (searchTerm) {
        result = result.filter((attraction) =>
          attraction.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (selectedCity !== "all") {
        result = result.filter(
          (attraction) => attraction.city?.id === parseInt(selectedCity)
        );
      }

      setFilteredAttractions(result);
    };

    filterData();
  }, [searchTerm, selectedCity, attractions]);

  return (
    <div className="records-list">
      <Attractions />

      <div className="filters">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="all">All Cities</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      {filteredAttractions.length > 0 ? (
        filteredAttractions.map((attraction) => (
          <CardAttractions
            key={attraction.id}
            name={attraction.name}
            description={attraction.description}
            image={attraction.images[0]} // Use the first image
          />
        ))
      ) : (
        <p>No touristic attractions available</p>
      )}
    </div>
  );
};

export default AllAttractionsList;
