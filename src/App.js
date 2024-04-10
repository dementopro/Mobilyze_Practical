import React, { useEffect, useState } from "react";
import Map from "./components/Map";
import LocationsList from "./components/LocationsList";
import "./styles.css";
import { handleExport, handleImport } from "./helper";

const App = () => {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [center, setMyLoc] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleMapClick = (e) => {
    const newMarker = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setMarkers([...markers, newMarker]);
  };

  const handleInfoClose = () => {
    setSelectedMarker(null);
  };

  const handleRemoveMarker = (index) => {
    const updatedMarkers = [...markers];
    updatedMarkers.splice(index, 1);
    setMarkers(updatedMarkers);
    setSelectedMarker(null);
    window.localStorage.setItem("markers", JSON.stringify(updatedMarkers));
  };

  const handleAddMarker = (index) => {
    let filteredMarker = markers[index];
    filteredMarker = {
      ...filteredMarker,
      persist: true,
    };
    const locations = JSON.parse(window.localStorage.getItem("markers"));
    const updatedMarkers = [...markers];
    updatedMarkers.splice(index, 1);
    setMarkers([...updatedMarkers, filteredMarker]);
    const updatedLocations =
      locations?.length > 0 ? [...locations, filteredMarker] : [filteredMarker];
    window.localStorage.setItem("markers", JSON.stringify(updatedLocations));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setMyLoc({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.log(err);
      }
    );
    const locations = window.localStorage.getItem("markers");

    if (locations) {
      setTimeout(() => {
        setMarkers(JSON.parse(locations));
      }, 2000);
    }
  }, []);

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-xl font-bold mb-4 text-center">
        Mobilyze Google Maps Task
      </h1>
      <div className="w-full mb-8">
        <Map
          markers={markers}
          center={center}
          onClick={handleMapClick}
          onMarkerClick={setSelectedMarker}
          selectedMarker={selectedMarker}
          onInfoClose={handleInfoClose}
        />
      </div>
      <h2 className="text-lg font-medium mb-2">Locations List</h2>
      <LocationsList
        markers={markers}
        onAddMarker={handleAddMarker}
        onRemoveMarker={handleRemoveMarker}
      />
      <div className="flex flex-col w-full">
        <div className="flex flex-row bg-white p-6 rounded shadow-xl justify-between">
          <h2 className="text-lg font-medium mb-4">Export Locations</h2>
          <button
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500"
            onClick={() => handleExport(markers)}
          >
            Export
          </button>
        </div>
        <div className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-lg font-medium mb-4">Import Locations</h2>

          <div className="flex space-x-4">
            <input
              className="border border-gray-400 p-2 rounded flex-1"
              type="file"
              multiple
              onChange={handleFileChange}
            />
            <button
              className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500"
              onClick={() =>
                handleImport(selectedFiles[0], setSelectedFiles, setMarkers)
              }
            >
              Import
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
