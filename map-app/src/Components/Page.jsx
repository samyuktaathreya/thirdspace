// Page.jsx
import { useState, useEffect } from "react";
import "../App.css";
import Map from "./Map";
import AddPinForm from "./AddPinForm";

export default function Page() {
  const [isAdding, setIsAdding] = useState(false);

  const endpointUrl =
    "https://supreme-cod-67jqgqvgjvj34qqw-8000.app.github.dev/pins";

  useEffect(() => { //runs once when the Map component is mounted
    
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
            onCreated={(createdPin) => {
              console.log("Created pin in parent:", createdPin);
              setIsAdding(false);
              // later: add to pins state + update map markers
            }}
          />
        )}
      </aside>

      <main className="mapArea">
        <Map />
      </main>
    </div>
  );
}
