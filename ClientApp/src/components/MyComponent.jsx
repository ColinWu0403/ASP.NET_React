import React, { useState } from "react";
import axios from "axios";

const MyComponent = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("https://localhost:7204/api/my/message");
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("An error occurred while fetching data.");
    }
    setIsLoading(false);
  };

  return (
    <div>
      <button onClick={fetchData} disabled={isLoading}>
        {isLoading ? "Loading..." : "Fetch Message"}
      </button>
      <h3>{message}</h3>
    </div>
  );
};

export default MyComponent;
