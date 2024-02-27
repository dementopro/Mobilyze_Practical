import React from "react";

const LocationsList = ({ markers, onAddMarker, onRemoveMarker }) => {
  return (
    <ul className="list-disc list-inside">
      {markers?.map((marker, index) => (
        <div className="flex flex-col m-3" key={index}>
          <li className="pt-1.5">
            Latitude: {marker.lat}, Longitude: {marker.lng}
          </li>
          <div className="content-center text-center">
            {!marker.persist && (
              <button
                onClick={() => onAddMarker(index)}
                className="bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600 ml-1.5"
              >
                Save Location
              </button>
            )}
            <button
              onClick={() => onRemoveMarker(index)}
              className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 ml-1.5"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </ul>
  );
};

export default LocationsList;
