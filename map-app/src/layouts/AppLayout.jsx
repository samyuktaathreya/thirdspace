import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import MapView from "../Components/Map";
import "../App.css";

export default function AppLayout() {
  const [pins, setPins] = useState([]);

  const endpointUrl =
    "https://supreme-cod-67jqgqvgjvj34qqw-8000.app.github.dev/pins";

  async function fetchPins() {
    try {
      const res = await fetch(endpointUrl);
      if (!res.ok) throw new Error(`GET /pins failed: ${res.status}`);
      const data = await res.json();

      const normalized = (data.pins ?? data).map((p) => ({
        ...p,
        longitude: typeof p.longitude === "string" ? parseFloat(p.longitude) : p.longitude,
        latitude: typeof p.latitude === "string" ? parseFloat(p.latitude) : p.latitude,
      }));

      setPins(normalized);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchPins();
  }, []);

  return (
    <div className="app">
      <aside className="sidebar">
        {/* Pass pins + fetchPins to whichever sidebar page is active */}
        <Outlet context={{ pins, endpointUrl, fetchPins }} />
      </aside>

      <main className="mapArea">
        <MapView pins={pins} />
      </main>
    </div>
  );
}
