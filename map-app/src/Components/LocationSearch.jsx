import { useEffect, useState } from "react";
import { SearchBox } from "@mapbox/search-js-react";

export default function LocationSearch({ onSelect }) {
  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

  const [value, setValue] = useState("");
  const [proximity, setProximity] = useState(null); // [lng, lat]

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setProximity([pos.coords.longitude, pos.coords.latitude]);
      },
      () => {
        // user denied or error; leave proximity null (SearchBox still works)
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, []);

  return (
    <SearchBox
      accessToken={MAPBOX_TOKEN}
      value={value}
      onChange={(v) => setValue(v)}
      placeholder="Search for a location"
      options={{
        // Only include proximity if we actually have it
        ...(proximity ? { proximity } : {}),
      }}
      onRetrieve={(res) => {
        const feature = res?.features?.[0];
        if (!feature) return;

        const [lng, lat] = feature.geometry.coordinates;

        onSelect?.({
          name:
            feature.properties?.name ||
            feature.properties?.full_address ||
            value,
          lng,
          lat,
          feature, // optional for debugging
        });
      }}
    />
  );
}
