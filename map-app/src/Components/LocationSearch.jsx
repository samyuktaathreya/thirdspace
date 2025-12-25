import { useState } from "react";
import { SearchBox } from "@mapbox/search-js-react";

export default function LocationSearch({ onSelect }) {
  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

  const [value, setValue] = useState("");

  return (
    <SearchBox
      accessToken={MAPBOX_TOKEN}
      value={value}
      onChange={(v) => setValue(v)}
      placeholder="Search for a location"
      options={{
        // Optional: bias results to SF (change or remove)
        proximity: [-122.431297, 37.773972],
      }}
      onRetrieve={(res) => {
        const feature = res?.features?.[0];
        if (!feature) return;

        const [lng, lat] = feature.geometry.coordinates;

        const payload = {
          name:
            feature.properties?.name ||
            feature.properties?.full_address ||
            value,
          lng,
          lat,
          feature, // keep full feature for debugging (you can remove later)
        };

        onSelect?.(payload);
      }}
    />
  );
}
