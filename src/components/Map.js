import React from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const Map = ({ markers, center, onClick, onMarkerClick, selectedMarker, onInfoClose }) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyDP_1Mzt-AqRmyxWZgcuZ1mak9AFRyvoeQ">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onClick={onClick}
      >
        {markers?.map((marker, index) => (
          <Marker
            key={index}
            position={marker}
            onClick={() => onMarkerClick(marker)}
          />
        ))}
        {selectedMarker && (
          <InfoWindow
            position={selectedMarker}
            onCloseClick={onInfoClose}
            className="bg-white p-4 rounded-lg shadow-lg"
          >
            <div>
              <h3 className="text-lg font-medium mb-2">Location</h3>
              <p className="text-gray-700">Latitude: {selectedMarker.lat}</p>
              <p className="text-gray-700">Longitude: {selectedMarker.lng}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
