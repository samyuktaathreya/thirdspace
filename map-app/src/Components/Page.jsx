// Page.jsx
import { useState, useEffect } from "react";
import "../App.css";
import Map from "./Map";
import AddPinForm from "./AddPinForm";

export default function Page() {
  const [isAdding, setIsAdding] = useState(false);
  const [pins, setPins] = useState([])

  const endpointUrl =
    "https://supreme-cod-67jqgqvgjvj34qqw-8000.app.github.dev/pins";

  async function fetchPins() {
    try {
      const res = await fetch(endpointUrl);
      if (!res.ok) throw new Error(`GET /pins failed: ${res.status}`);
      const data = await res.json();
      setPins((data.pins ?? data).map(p => ({
        ...p,
        longitude: typeof p.longitude === "string" ? parseFloat(p.longitude) : p.longitude,
        latitude: typeof p.latitude === "string" ? parseFloat(p.latitude) : p.latitude,
      })));
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => { //send GET request to "/pins" when page is mounted
    fetchPins();
  }, []);

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebarHeader">
          <h1>Third Space</h1>

          {!isAdding ? (
            <>
              <input className="search" placeholder="Search places..." />
              <button className="primaryBtn" onClick={() => setIsAdding(true)}>
                + Add New Place
              </button>
            </>
          ) : (
            <button className="primaryBtn" onClick={() => setIsAdding(false)}>
              ← Back
            </button>
          )}
        </div>

        {!isAdding ? (
          <div className="cards">
            <div className="card">Card 1…</div>
            <div className="card">Card 2…</div>
            <div className="card">Card 3…</div>
          </div>
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
