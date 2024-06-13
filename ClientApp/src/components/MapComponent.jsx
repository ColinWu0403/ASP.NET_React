import React, { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import axios from "axios";
import "../index.css";

const mapContainerStyle = {
  height: "400px",
  width: "800px",
};

const center = {
  lat: 40.42382047835122,
  lng: -86.92125022135261,
};

const MapComponent = ({ onMarkerClick }) => {
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!googleMapsApiKey) {
    console.error("Google Maps API key is missing");
    return null;
  }

  const [showBuildingInfo, setShowBuildingInfo] = useState(false);
  const [buildingData, setBuildingData] = useState(null);
  const [buttonPosition, setButtonPosition] = useState(center);

  const handleButtonClick = async () => {
    try {
      const response = await axios.get("https://localhost:7204/api/building");

      console.log("Response:", response); // Log the entire response object
      console.log("Data:", response.data);
      setBuildingData(response.data);
      setShowBuildingInfo(true);
    } catch (error) {
      console.error("Error fetching building data:", error);
    }
  };

  return (
    <div className="flex flex-col z-0">
      <LoadScript googleMapsApiKey={googleMapsApiKey} loading="async">
        <div className="">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={15}
            onClick={(e) =>
              setButtonPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() })
            }
          >
            {buttonPosition && (
              <Marker
                position={buttonPosition}
                icon={{
                  url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                }}
                onClick={onMarkerClick}
              />
            )}
            {showBuildingInfo && (
              <InfoWindow
                position={buttonPosition}
                onCloseClick={() => setShowBuildingInfo(false)}
              >
                <div className="p-4">
                  <h2 className="text-lg font-medium text-[#000000]">
                    {buildingData.name}
                  </h2>
                  <p className="text-sm text-[#000000]">
                    {buildingData.address}
                  </p>
                  {/* Display other relevant data */}
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
        <br />
        {buttonPosition && (
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            onClick={handleButtonClick}
          >
            Show Building Info
          </button>
        )}
      </LoadScript>
    </div>
  );
};

export default MapComponent;
