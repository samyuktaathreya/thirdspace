import mapboxgl from "mapbox-gl";

let activePopup = null;

export function focusFeature(map, feature) {
  if (!map || !feature) return;

  const coords = feature.geometry.coordinates.slice();
  const { name, type, notes, rating } = feature.properties || {};

  map.easeTo({ center: coords, duration: 500 });

  if (activePopup) activePopup.remove();

  activePopup = new mapboxgl.Popup({ offset: 12 })
    .setLngLat(coords)
    .setHTML(`
      <div style="min-width: 180px">
        <div><b>${name ?? "Place"}</b></div>
        ${type ? `<div>Type: ${type}</div>` : ""}
        ${rating ? `<div>Rating: ${rating}</div>` : ""}
        ${notes ? `<div style="margin-top:6px">${notes}</div>` : ""}
      </div>
    `)
    .addTo(map);
}
