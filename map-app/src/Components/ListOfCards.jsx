import "../App.css";
import {focusFeature} from '../helpers/mapFocus.js';

export default function ListOfCards({ pins = [], onSelectPin }) {
  if (!pins.length) {
    return (
      <div className="cards">
        <div className="card">No places yet.</div>
      </div>
    );
  }

  return (
    <div className="cards">
      {pins.map((pin) => (
        <div
          className="card"
          key={pin.id}
          role="button"
          tabIndex={0}
          onClick={() => onSelectPin(pin)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onSelectPin?.(pin);
          }}
          style={{ cursor: "pointer" }}
        >
          <div style={{ fontWeight: 700 }}>{pin.name || "Unnamed place"}</div>
          {pin.type && <div>Type: {pin.type}</div>}
          {pin.rating !== null && pin.rating !== undefined && (
            <div>Rating: {pin.rating}</div>
          )}
          {pin.notes && <div style={{ marginTop: 6 }}>{pin.notes}</div>}
        </div>
      ))}
    </div>
  );
}

