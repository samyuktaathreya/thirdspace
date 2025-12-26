import { useEffect, useMemo, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "../App.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

function pinsToGeoJSON(pins) {
  console.log(pins);
  return {
    type: "FeatureCollection",
    features: (pins || [])
      .filter(p => typeof p.longitude === "number" && typeof p.latitude === "number")
      .map(p => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [p.longitude, p.latitude], // IMPORTANT: [lng, lat]
        },
        properties: {
          id: p.id,
          type: p.type,
          notes: p.notes ?? "",
          rating: p.rating ?? null,
        },
      })),
  };
}

// Expect `pins` from parent: <Map pins={pins} />
export default function Map({ pins = [] }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null); // store the map instance
  const loadedRef = useRef(false);
  const mapInstanceRef = useRef(null);   // holds the actual mapbox map object

  // Convert pins -> GeoJSON (in-memory object, not a file)
  const pinsGeoJson = useMemo(() => {
    return {
      type: "FeatureCollection",
      features: (pins || [])
        .filter((p) => typeof p.longitude === "number" && typeof p.latitude === "number")
        .map((p) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [p.longitude, p.latitude], // [lng, lat]
          },
          properties: {
            id: p.id,
            type: p.type,
            notes: p.notes ?? "",
            rating: p.rating ?? null,
          },
        })),
    };
  }, [pins]);

  // 1) Create the map ONCE
  useEffect(() => {
    if (mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-122.4194, 37.7749],
      zoom: 9,
      style: "mapbox://styles/queenelizabeth1/cmjf5sekx003301sp9fnp10lj",
    });
    mapInstanceRef.current = map;

    mapRef.current = map;

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
      showUserHeading: true,
    });

    map.addControl(geolocate);

    map.on("load", () => {
      loadedRef.current = true;

      // Add source backed by React-driven GeoJSON
      map.addSource("pins", {
        type: "geojson",
        data: pinsToGeoJSON(pins),
      });
      console.log("initial features:", pinsToGeoJSON(pins).features.length);

      map.loadImage("/cafe_pin.png", (error, image) => {
        if (error) { console.error(error); return; }
        if (!map.hasImage("cafe-pin")) map.addImage("cafe-pin", image);

        // Single layer that renders all pin features
        if (!map.getLayer("pins-layer")) {
          map.addLayer({
            id: "pins-layer",
            type: "symbol",
            source: "pins",
            layout: {
              "icon-image": "cafe-pin",
              "icon-size": 0.025,
            },
          });
        }
      });

      geolocate.trigger();
    });

    return () => map.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2) Whenever pins change, update the existing source data
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !loadedRef.current) return;

    const src = map.getSource("pins");
    if (src) {
      src.setData(pinsGeoJson);
    }
  }, [pinsGeoJson]);

  return <div ref={mapContainerRef} className="mapContainer" />;
}
