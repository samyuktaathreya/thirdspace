import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function Map() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // 🔧 If you're debugging, temporarily use:
      // style: "mapbox://styles/mapbox/streets-v12",
      style: "mapbox://styles/queenelizabeth1/cmjf5sekx003301sp9fnp10lj",
      center: [-122.4194, 37.7749],
      zoom: 12,
    });

    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl());

    map.on("error", (e) => console.error("Mapbox error:", e?.error || e));

    // Geolocation (optional)
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          map.flyTo({ center: [longitude, latitude], zoom: 13 });
        },
        (err) => console.warn("Geolocation error:", err),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    }

    map.on("load", async () => {
      try {
        // 1) Load GeoJSON
        const r = await fetch("/bay-area-points.geojson");
        if (!r.ok) throw new Error(`GeoJSON fetch failed: ${r.status} ${r.statusText}`);
        const geojson = await r.json();

        // 2) Add or update source
        const src = map.getSource("bay-area-test-points");
        if (src) {
          src.setData(geojson);
        } else {
          map.addSource("bay-area-test-points", { type: "geojson", data: geojson });
        }

        // 3) Load pin image
        map.loadImage("/cafe_pin.png", (error, image) => {
          if (error) {
            console.error("Pin image failed to load:", error);
            return;
          }

          if (!map.hasImage("custom-icon")) {
            map.addImage("custom-icon", image);
          }

          // 4) Add layer
          if (!map.getLayer("points")) {
            map.addLayer({
              id: "points",
              type: "symbol",
              source: "bay-area-test-points",
              layout: {
                "icon-image": "custom-icon",
                "icon-size": 0.25,
                "icon-anchor": "bottom",
                "icon-offset": [0, 0],
                "icon-allow-overlap": true,
              },
            });
          }
        });
      } catch (err) {
        console.error("Load failed:", err);
      }
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainerRef} style={{ width: "100vw", height: "100vh" }} />;
}
