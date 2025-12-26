import "../App.css";

export default function ListOfCards({ pins = [] }) {
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
        <div className="card" key={pin.id}>
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
