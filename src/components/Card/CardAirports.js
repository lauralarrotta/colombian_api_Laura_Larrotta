import React from "react";
import "./Card.css";
import Airports from "../../assets/Airport.jpg";
const Card = ({ name, description }) => {
  return (
    <div className="card">
      <img src={Airports} alt={name} className="card-image" />
      <div className="card-overlay">
        <h3 className="card-title">{name}</h3>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export default Card;
