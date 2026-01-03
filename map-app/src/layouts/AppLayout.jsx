import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchPins from "../helpers/fetchPins.js"

import MapView from "../Components/Map";
import "../App.css";

export default function AppLayout() {
  const [pins, setPins] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPin, setSelectedPin] = useState(null);

  const endpointUrl =
    "https://supreme-cod-67jqgqvgjvj34qqw-8000.app.github.dev";

  useEffect(() => {
    fetchPins(endpointUrl, setPins);
  }, []);

  const refreshPins = () => fetchPins(endpointUrl, setPins);

  useEffect(() => {
    refreshPins();
  }, []);

  const isGallery = location.pathname === "/gallery";

  function handleToggleView() {
    navigate(isGallery ? "/" : "/gallery");
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <Outlet context={{ pins, endpointUrl, fetchPins, onSelectPin: setSelectedPin, refreshPins}} />
        <button type="button" onClick={handleToggleView}>
          {isGallery ? "Map" : "Gallery"}
        </button>
      </aside>

      <main className="mapArea">
        <MapView pins={pins} selectedPin={selectedPin} />
      </main>


    </div>
  );
}