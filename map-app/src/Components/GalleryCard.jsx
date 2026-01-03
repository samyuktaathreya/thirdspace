const API_URL = import.meta.env.VITE_API_URL;
export default function GalleryCard({pin, onSelectPin}) {
    const imgSrc = pin.photo_url ? `${API_URL}${pin.photo_url}` : null;
    return (
    <div
        className="GalleryCard"
        key={pin.id}
        role="button"
        tabIndex={0}
        onClick={() => onSelectPin(pin)}
        onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelectPin?.(pin);
        }}
        style={{ cursor: "pointer" }}
    >
      {imgSrc && (
        <img
          className="cardPhoto"
          src={imgSrc}
          alt={pin.name || "Place photo"}
        />
      )}
        <div style={{ fontWeight: 700 }}>{pin.name || "Unnamed place"}</div>
        {pin.type && <div>Type: {pin.type}</div>}
        {pin.rating !== null && pin.rating !== undefined && (
        <div>Rating: {pin.rating}</div>
        )}
        {pin.notes && <div style={{ marginTop: 6 }}>{pin.notes}</div>}
    </div>
    );
}