
import React, { useState } from "react";

function PlantCard({ plant, onDeletePlant }) {
  const [inStock, setInStock] = useState(true);

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>

      <button onClick={() => setInStock(!inStock)}>
        {inStock ? "In Stock" : "Out of Stock"}
      </button>

      <button onClick={() => onDeletePlant(plant.id)}>
        Delete
      </button>
    </li>
  );
}

export default PlantCard;
