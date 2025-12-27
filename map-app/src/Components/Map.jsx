import { useEffect, useMemo, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "../App.css";
import { focusFeature } from "../helpers/mapFocus";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;


// Expect `pins` from parent: <Map pins={pins} />
export default function MapView({ pins = [], selectedPin }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null); // store the map instance
  const loadedRef = useRef(false);
  const mapInstanceRef = useRef(null);   // holds the actual mapbox map object

  // Convert pins -> GeoJSON (in-memory object, not a file)
  const pinsGeoJson = useMemo(() => ({
    type: "FeatureCollection",
    features: (pins || [])
      .filter(p => Number.isFinite(p.longitude) && Number.isFinite(p.latitude))
      .map(p => ({
        type: "Feature",
        geometry: { type: "Point", coordinates: [p.longitude, p.latitude] },
        properties: {
          id: p.id,
          name: p.name,
          type: p.type,
          notes: p.notes,
          rating: p.rating,
        },
      })),
  }), [pins]);

  const pinsGeoJsonRef = useRef({ type: "FeatureCollection", features: [] });

  useEffect(() => {
    pinsGeoJsonRef.current = pinsGeoJson;

    const map = mapRef.current;
    if (!map || !loadedRef.current) return;

    const src = map.getSource("pins");
    if (src) src.setData(pinsGeoJsonRef.current);
  }, [pinsGeoJson]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedPin) return;

    const featureLike = {
      geometry: {
        coordinates: [selectedPin.longitude, selectedPin.latitude],
      },
      properties: selectedPin,
    };

    focusFeature(map, featureLike);
  }, [selectedPin]);

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
      console.log(pinsGeoJsonRef.current.features.length); 
      loadedRef.current = true;

      if (!map.getSource("pins")) {
        map.addSource("pins", { type: "geojson", data: pinsGeoJson });
      }

      map.loadImage("/cafe_pin.png", (error, image) => {
        if (error) { console.error("loadImage failed:", error); return; }

        if (!map.hasImage("cafe-pin")) map.addImage("cafe-pin", image);

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

          // Register events only after layer exists
          map.on("mouseenter", "pins-layer", () => {
            map.getCanvas().style.cursor = "pointer";
          });

          map.on("mouseleave", "pins-layer", () => {
            map.getCanvas().style.cursor = "";
          });

          map.on("click", "pins-layer", (e) => {
            const feature = e.features?.[0];
            if (feature) {
              focusFeature(map, feature);
            }
          });
        }
      });

      geolocate.trigger();
      map.getSource("pins")?.setData(pinsGeoJsonRef.current);
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
