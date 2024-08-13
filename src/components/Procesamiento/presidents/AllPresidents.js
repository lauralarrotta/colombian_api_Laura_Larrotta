import React, { useEffect, useState } from "react";
import Cardpresident from "../../Card/CardPresident";
import { fetchPresidents } from "../../../api/apiService";
import Presidentes from "./PresidentsCount";

const PresidentsList = () => {
  const [presidents, setPresidents] = useState([]);
  const [filteredPresidents, setFilteredPresidents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedParty, setSelectedParty] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const getData = async () => {
      const data = await fetchPresidents();
      const uniquePresidents = Array.from(
        new Set(data.map((president) => president.name))
      ).map((name) => data.find((president) => president.name === name));
      setPresidents(uniquePresidents);
      setFilteredPresidents(uniquePresidents);
    };
    getData();
  }, []);

  useEffect(() => {
    let results = presidents;
    if (searchTerm) {
      results = results.filter((president) =>
        president.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedYear) {
      results = results.filter(
        (president) =>
          new Date(president.startPeriodDate).getFullYear().toString() ===
          selectedYear
      );
    }
    if (selectedParty) {
      results = results.filter(
        (president) => president.politicalParty === selectedParty
      );
    }
    if (selectedCity) {
      results = results.filter((president) => president.city === selectedCity);
    }
    setFilteredPresidents(results);
  }, [searchTerm, selectedYear, selectedParty, selectedCity, presidents]);

  const years = Array.from(
    new Set(
      presidents.map((president) =>
        new Date(president.startPeriodDate).getFullYear()
      )
    )
  );

  const parties = Array.from(
    new Set(presidents.map((president) => president.politicalParty))
  );

  return (
    <div className="records-list">
      <Presidentes
        setSearchTerm={setSearchTerm}
        setSelectedYear={setSelectedYear}
        setSelectedParty={setSelectedParty}
        setSelectedCity={setSelectedCity}
      />
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          onChange={(e) => setSelectedYear(e.target.value)}
          value={selectedYear}
        >
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => setSelectedParty(e.target.value)}
          value={selectedParty}
        >
          <option value="">Select Party</option>
          {parties.map((party) => (
            <option key={party} value={party}>
              {party}
            </option>
          ))}
        </select>
      </div>
      {filteredPresidents.map((president) => (
        <Cardpresident
          key={president.id}
          name={president.name}
          description={president.description}
        />
      ))}
    </div>
  );
};

export default PresidentsList;
