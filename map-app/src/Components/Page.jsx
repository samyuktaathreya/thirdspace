// Page.jsx
import { useState, useEffect } from "react";
import "../App.css";
import Map from "./Map";
import AddPinForm from "./AddPinForm";
import ListOfCards from "./ListOfCards";
import SearchCards from './SearchCards';

export default function Page() {
  const [isAdding, setIsAdding] = useState(false);
  const [pins, setPins] = useState([]);
  const [filteredPins, setFilteredPins] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

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

      console.log("first pin", normalized[0]);
      console.log("types", typeof normalized[0]?.longitude, typeof normalized[0]?.latitude);

      setPins(normalized);
      setFilteredPins(normalized);
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
        <div className="sidebarHeader">
          <h1>Third Space</h1>

          {!isAdding ? (
            <SearchCards
              pins={pins}
              onResults={setFilteredPins}
              onSearch={setHasSearched}
            />
          ) : (
            <button className="primaryBtn" onClick={() => setIsAdding(false)}>
              ← Back
            </button>
          )}
        </div>

        {!isAdding ? (
          hasSearched && filteredPins.length === 0 ? (
            <div className="emptyState">No places found.</div>
          ) : (
            <ListOfCards pins={hasSearched ? filteredPins : pins} />
          )
        ) : (
          <AddPinForm
            endpointUrl={endpointUrl}
            onCreated={() => {
              setIsAdding(false);
              fetchPins();
            }}
          />
        )}
      </aside>

      <main className="mapArea">
        <Map pins={pins} />
      </main>
    </div>
  );
}
