import { useState } from "react";
import LocationSearch from "./LocationSearch";

export default function AddPinForm({ onCreated, endpointUrl }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!selectedLocation) {
      alert("Pick a location first");
      return;
    }

    const formData = new FormData();

    formData.append("latitude", selectedLocation.lat);
    formData.append("longitude", selectedLocation.lng);
    formData.append("name", name);
    formData.append("type", type);
    formData.append("notes", notes);
    formData.append("rating", rating === "" ? "" : Number(rating));

    if (photo) {
      formData.append("photo", photo);
    }

    const res = await fetch(endpointUrl, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    onCreated?.(data);
  }


  return (
    <form className="addPlaceForm" onSubmit={handleSubmit}>
      <div>
        <label className="label">Location</label>
        <LocationSearch onSelect={setSelectedLocation} />
        <div className="formSubtle">
          {selectedLocation
            ? `Selected: ${selectedLocation.name} (${selectedLocation.lat}, ${selectedLocation.lng})`
            : "No location selected yet"}
        </div>
      </div>

      <div>
        <label className="label">Name</label>
        <input
          className="input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='eg: Cute Coffee Shop'
        />
      </div>

      <div>
        <label className="label">Type</label>
        <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select type</option>
          <option value="cafe">Cafe</option>
          <option value="library">Library</option>
          <option value="college">College</option>
        </select>
      </div>

      <div>
        <label className="label">Notes</label>
        <textarea
          className="textarea"
          placeholder="Description / caption"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div>
        <label className="label">Rating</label>
        <input
          className="input"
          type="number"
          min="0"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </div>

      <div>
        <label className="label">Photo</label>
        <input
          className="input"
          type="file"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0] ?? null)}
        />
        {photo && (
          <div className="formSubtle">
            Selected: {photo.name}
          </div>
        )}
      </div>

      <button type="submit" className="primaryBtn">Save Place</button>
    </form>
  );
}
