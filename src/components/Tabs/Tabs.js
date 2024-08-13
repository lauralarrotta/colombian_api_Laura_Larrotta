import React, { useState } from "react";
import "./tabs.css";
import Presidentes from "../Procesamiento/presidents/PresidentsCount";
import AllAirports from "../Procesamiento/airports/AllAirports";
import AllPresidents from "../Procesamiento/presidents/AllPresidents";
import AllAttractionsList from "../Procesamiento/TouristicAttractions/TouristicAttractions";
import AirportsRegion from "../Procesamiento/airports/AirportsRegion";
import PresidentsByParty from "../Procesamiento/presidents/PresidentsByParty";
import TouristAttractionsByLocation from "../Procesamiento/TouristicAttractions/TouristicByLocation";
import AirportsByLocation from "../Procesamiento/airports/AirportsByLocation";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("presidentes");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [processingDropdownOpen, setProcessingDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleProcessingDropdownToggle = () => {
    setProcessingDropdownOpen(!processingDropdownOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "presidentes":
        return <AllPresidents />;
      case "aeropuertos":
        return <AllAirports />;
      case "atracciones":
        return <AllAttractionsList />;
      case "party":
        return <PresidentsByParty />;
      case "ciudad":
        return <TouristAttractionsByLocation />;
      case "locacion":
        return <AirportsRegion />;
      case "aeropuerto":
        return <AirportsByLocation />;
      default:
        return <Presidentes />;
    }
  };

  return (
    <div>
      <div className="tabs">
        <button onClick={handleDropdownToggle} className="dropdown-button">
          Datos de la Prueba
        </button>
        {dropdownOpen && (
          <div className="dropdown-content">
            <button onClick={() => setActiveTab("presidentes")}>
              Ver Todos los Presidentes
            </button>
            <button onClick={() => setActiveTab("aeropuertos")}>
              Ver Todos los Aeropuertos
            </button>
            <button onClick={() => setActiveTab("atracciones")}>
              Ver Todas las Atracciones Turísticas
            </button>
          </div>
        )}

        <button
          onClick={handleProcessingDropdownToggle}
          className="dropdown-button"
        >
          Procesamiento
        </button>
        {processingDropdownOpen && (
          <div className="dropdown-content">
            {/* Aquí puedes agregar las opciones específicas para el procesamiento */}
            <button onClick={() => setActiveTab("party")}>
              Presidentes Por Partido Politico
            </button>
            <button onClick={() => setActiveTab("ciudad")}>
              Atracciones Turisticas por Departamento y Ciudad
            </button>
            <button onClick={() => setActiveTab("aeropuerto")}>
              Aeropuertos por Departamento, Ciudad
            </button>
            <button onClick={() => setActiveTab("locacion")}>
              Aeropuertos por Departamento, Ciudad y Tipo
            </button>
          </div>
        )}
      </div>
      <div className="tab-content">{renderContent()}</div>
    </div>
  );
};

export default Tabs;
