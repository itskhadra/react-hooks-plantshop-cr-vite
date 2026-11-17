
import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch plants from the server
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data))
      .catch((error) =>
        console.error("Error fetching plants:", error)
      );
  }, []);

  // Add a new plant
  const handleAddPlant = (newPlant) => {
    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((plant) => {
        setPlants((currentPlants) => [...currentPlants, plant]);
      })
      .catch((error) =>
        console.error("Error adding plant:", error)
      );
  };

  // Delete a plant
  const handleDeletePlant = (id) => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete plant");
        }

        setPlants((currentPlants) =>
          currentPlants.filter((plant) => plant.id !== id)
        );
      })
      .catch((error) =>
        console.error("Error deleting plant:", error)
      );
  };

  // Search plants
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />

      <Search onSearch={setSearchTerm} />

      <PlantList
        plants={filteredPlants}
        onDeletePlant={handleDeletePlant}
      />
    </main>
  );
}

export default PlantPage;
