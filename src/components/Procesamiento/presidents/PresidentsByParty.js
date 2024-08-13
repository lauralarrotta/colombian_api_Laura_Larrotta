import React, { useEffect, useState } from "react";
import { fetchPresidents } from "../../../api/apiService";
import { groupPresidentsByParty } from "../../../utils/OrganizePresidents";
import "./presidents.css"; // Asegúrate de usar la ruta correcta

const PresidentsByParty = () => {
  const [groupedData, setGroupedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedParty, setSelectedParty] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    const getPresidents = async () => {
      try {
        const data = await fetchPresidents();
        const grouped = groupPresidentsByParty(data);
        setGroupedData(grouped);
        setFilteredData(grouped); // Inicialmente muestra todos los datos
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getPresidents();
  }, []);

  useEffect(() => {
    let filtered = groupedData;

    // Filtrar por partido político
    if (selectedParty !== "all") {
      filtered = filtered.filter((group) => group.party === selectedParty);
    }

    // Filtrar por nombre
    if (nameFilter) {
      filtered = filtered.map((group) => ({
        ...group,
        members: group.members.filter((president) =>
          `${president.firstName} ${president.lastName}`
            .toLowerCase()
            .includes(nameFilter.toLowerCase())
        ),
      }));
    }

    // Ordenar por fecha
    filtered = filtered.map((group) => ({
      ...group,
      members: group.members.sort((a, b) =>
        sortOrder === "asc"
          ? new Date(a.startPeriodDate) - new Date(b.startPeriodDate)
          : new Date(b.startPeriodDate) - new Date(a.startPeriodDate)
      ),
    }));

    setFilteredData(filtered);
  }, [selectedParty, sortOrder, nameFilter, groupedData]);

  const handleFilterChange = (event) => {
    setSelectedParty(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="table-container">
      <h1>Presidentes por Partido Político</h1>

      <div className="filters">
        <label>
          Filtrar por Partido Político:
          <select
            className="filter-select"
            value={selectedParty}
            onChange={handleFilterChange}
          >
            <option value="all">Todos</option>
            {groupedData.map(({ party }) => (
              <option key={party} value={party}>
                {party}
              </option>
            ))}
          </select>
        </label>

        <label>
          Ordenar por Fecha:
          <select
            className="filter-select"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </label>

        <label>
          Filtrar por Nombre:
          <input
            className="filter-input"
            type="text"
            value={nameFilter}
            onChange={handleNameFilterChange}
          />
        </label>
      </div>

      {Array.isArray(filteredData) && filteredData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Partido Político</th>
              <th>Nombre del Presidente</th>
              <th>Comienzo de Mandato</th>
              <th>Fin de Mandato</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.flatMap(({ party, members }) =>
              members.map((president) => (
                <tr key={president.id}>
                  <td>{party}</td>
                  <td>
                    {president.name} {president.lastName}
                  </td>
                  <td>{president.startPeriodDate}</td>
                  <td>{president.endPeriodDate}</td>
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

export default PresidentsByParty;
