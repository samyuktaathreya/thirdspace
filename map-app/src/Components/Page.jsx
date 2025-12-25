import { useState } from 'react'
import '../App.css'
import Map from './Map'
import LocationSearch from './LocationSearch'

export default function Page() {
  const [isAdding, setIsAdding] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState("");

  async function handleSubmit (e) {
    e.preventDefault()

    if (!selectedLocation) {
      alert("Pick a location first");
      return;
    }

    // For now: just confirm you have the coords for backend testing
    console.log("Selected location:", selectedLocation)

    const payload = {
      latitude: selectedLocation?.lat ?? null,
      longitude: selectedLocation?.lng ?? null,
      type: type,
      notes: notes,
      rating: rating === "" ? null : Number(rating)
    }

    console.log("Sending:", payload);

    const res = await fetch("https://supreme-cod-67jqgqvgjvj34qqw-8000.app.github.dev/pins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("Response:", data);
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebarHeader">
          <h1>Third Space</h1>

          {!isAdding && (
            <>
              <input className="search" placeholder="Search places..." />
              <button
                className="primaryBtn"
                onClick={() => setIsAdding(true)}
              >
                + Add New Place
              </button>
            </>
          )}

          {isAdding && (
            <button
              className="primaryBtn"
              onClick={() => setIsAdding(false)}
            >
              ← Back
            </button>
          )}
        </div>

        {!isAdding && (
          <div className="cards">
            <div className="card">Card 1…</div>
            <div className="card">Card 2…</div>
            <div className="card">Card 3…</div>
          </div>
        )}

        {isAdding && (
          <form className="addPlaceForm" onSubmit={handleSubmit}>
            {/* 1. Search for a location */}
            <div>
              <label>Location</label>
              <LocationSearch onSelect={setSelectedLocation} />
              <div style={{ fontSize: 12 }}>
                {selectedLocation
                  ? `Selected: ${selectedLocation.name} (${selectedLocation.lat}, ${selectedLocation.lng})`
                  : "No location selected yet"}
              </div>
            </div>

            {/* 2. Type */}
            <div>
              <label>Type</label>
              <select name="type" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Select type</option>
                <option value="cafe">Cafe</option>
                <option value="library">Library</option>
                <option value="college">College</option>
              </select>
            </div>

            {/* 3. Notes */}
            <div>
              <label>Notes</label>
              <textarea
                name="notes"
                placeholder="Description / caption"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* 4. Rating */}
            <div>
              <label>Rating</label>
              <input
                type="number"
                name="rating"
                min="0"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>

            <button type="submit">Save Place</button>
          </form>
        )}
      </aside>

      <main className="mapArea">
        <Map />
      </main>
    </div>
  )
}
