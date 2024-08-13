import React from "react";
import { useState } from "react";
import "./Card.css";

const defaultImage = "https://via.placeholder.com/300";

const CardAttractions = ({ name, description, image }) => {
  const [imgSrc, setImgSrc] = useState(image || defaultImage);

  const handleError = () => {
    setImgSrc(defaultImage);
  };

  return (
    <div className="card">
      <img
        src={imgSrc}
        alt={name}
        className="card-image"
        onError={handleError}
      />
      <div className="card-overlay">
        <h3 className="card-title">{name}</h3>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export default CardAttractions;
