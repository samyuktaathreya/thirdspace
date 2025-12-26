import { useState, useEffect } from "react";
import SearchCards from './SearchCards'
import ListOfCards from './ListOfCards'
import MapView from './Map'

export default function MapPage() {
  const [pins, setPins] = useState([]);
  const [filteredPins, setFilteredPins] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const endpointUrl =
    "https://supreme-cod-67jqgqvgjvj34qqw-8000.app.github.dev/pins";

  async function fetchPins() {
    const res = await fetch(endpointUrl);
    const data = await res.json();

    const normalized = (data.pins ?? data).map((p) => ({
      ...p,
      longitude: +p.longitude,
      latitude: +p.latitude,
    }));

    setPins(normalized);
    setFilteredPins(normalized);
  }

  useEffect(() => {
    fetchPins();
  }, []);

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebarHeader">
          <h1>Third Space</h1>

          <SearchCards
            pins={pins}
            onResults={setFilteredPins}
            onSearch={setHasSearched}
          />
        </div>

        {hasSearched && filteredPins.length === 0 ? (
          <div className="emptyState">No places found.</div>
        ) : (
          <ListOfCards pins={hasSearched ? filteredPins : pins} />
        )}
      </aside>

      <main className="mapArea">
        <MapView pins={pins} />
      </main>
    </div>
  );
}
