import { useState, useEffect } from "react";
export default function SearchCards({ pins = [], onResults, onSearch }) {
  const [query, setQuery] = useState("");

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      onSearch(false);
      onResults([]);
      return;
    }

    onSearch(true);

    const lower = value.toLowerCase();
    const filtered = pins.filter((p) =>
      p.name?.toLowerCase().includes(lower) ||
      p.notes?.toLowerCase().includes(lower) ||
      p.type?.toLowerCase().includes(lower)
    );

    onResults(filtered);
  }

  return (
    <input
      className="search"
      placeholder="Search places..."
      value={query}
      onChange={handleChange}
    />
  );
}
