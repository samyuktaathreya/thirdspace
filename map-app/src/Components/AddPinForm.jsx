// AddPinForm.jsx
import { useState } from "react";
import LocationSearch from "./LocationSearch";

export default function AddPinForm({ onCreated, endpointUrl }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!selectedLocation) {
      alert("Pick a location first");
      return;
    }

    const payload = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
      type,
      notes,
      rating: rating === "" ? null : Number(rating),
    };

    console.log("Sending:", payload);

    const res = await fetch(endpointUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("Response:", data);

    // Let the parent decide what to do (close form, add marker, etc.)
    onCreated?.(data);
  }

  return (
    <form className="addPlaceForm" onSubmit={handleSubmit}>
      <div>
        <label>Location</label>
        <LocationSearch onSelect={setSelectedLocation} />
        <div style={{ fontSize: 12 }}>
          {selectedLocation
            ? `Selected: ${selectedLocation.name} (${selectedLocation.lat}, ${selectedLocation.lng})`
            : "No location selected yet"}
        </div>
      </div>

      <div>
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select type</option>
          <option value="cafe">Cafe</option>
          <option value="library">Library</option>
          <option value="college">College</option>
        </select>
      </div>

      <div>
        <label>Notes</label>
        <textarea
          placeholder="Description / caption"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div>
        <label>Rating</label>
        <input
          type="number"
          min="0"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </div>

      <button type="submit">Save Place</button>
    </form>
  );
}
