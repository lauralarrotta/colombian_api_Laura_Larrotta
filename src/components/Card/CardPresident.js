import React from "react";
import "./Card.css";
import Bandera from "../../assets/colombia.jpeg";

const Card = ({ name, description, image }) => {
  return (
    <div className="card">
      <img src={Bandera} alt={name} className="card-image" />
      <div className="card-overlay">
        <h3 className="card-title">{name}</h3>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export default Card;
