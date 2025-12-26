import { useEffect, useMemo, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "../App.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;


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
        .filter(
          (p) => Number.isFinite(p.longitude) && Number.isFinite(p.latitude)
        )
        .map((p) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [p.longitude, p.latitude], // [lng, lat]
          },
          properties: {
            id: p.id,
            name: p.name,
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
        data: pinsGeoJson,
      });
      console.log("initial features:", pinsGeoJson.features.length);

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

      map.on("mouseenter", "pins-layer", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "pins-layer", () => {
        map.getCanvas().style.cursor = "";
      });

      map.on("click", "pins-layer", (e) => {
        const feature = e.features?.[0];
        if (!feature) return;

        const coords = feature.geometry.coordinates.slice();
        const {name, type, notes, rating } = feature.properties || {};

        map.easeTo({
          center: coords,
          duration: 500,
        });

        new mapboxgl.Popup({ offset: 12 })
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
