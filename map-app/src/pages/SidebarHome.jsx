import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import ListOfCards from "../Components/ListOfCards";
import SearchCards from "../Components/SearchCards";

export default function SidebarHome() {
  const navigate = useNavigate();
  const { pins, onSelectPin } = useOutletContext();

  const [filteredPins, setFilteredPins] = useState(pins);
  const [hasSearched, setHasSearched] = useState(false);

  // keep filteredPins in sync when pins load
  // simplest way: if user hasn't searched, show pins directly
  const shownPins = hasSearched ? filteredPins : pins;

  return (
    <>
      <div className="sidebarHeader">
        <h1>Third Space</h1>

        <div style={{ display: "flex", gap: 8 }}>
          <button className="primaryBtn" onClick={() => navigate("/add")}>
            + Add new place
          </button>
        </div>

        <SearchCards
          pins={pins}
          onResults={setFilteredPins}
          onSearch={setHasSearched}
        />
      </div>

      {hasSearched && shownPins.length === 0 ? (
        <div className="emptyState">No places found.</div>
      ) : (
        <ListOfCards pins={pins} onSelectPin={onSelectPin} />
      )}
    </>
  );
}