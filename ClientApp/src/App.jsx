import React, { useState } from "react";
import { MyComponent, MapComponent } from "./components";
import axios from "axios";
import "./App.css";

const App = () => {
  const [buildingData, setBuildingData] = useState(null);

  const handleMarkerClick = async () => {
    try {
      const response = await axios.get("https://localhost:7204/api/building");
      setBuildingData(response.data);
    } catch (error) {
      console.error("Error fetching building data:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg[#242424] text-white">
      <h1 className="text-4xl mb-4">Google Maps in React</h1>
      <MapComponent onMarkerClick={handleMarkerClick} />
      <h1 className="text-4xl mb-4">Click Me</h1>
      <MyComponent />
    </div>
  );
};

export default App;
