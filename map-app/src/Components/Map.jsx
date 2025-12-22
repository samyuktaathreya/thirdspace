import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "../App.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function Map() {
  const mapRef = useRef(null);

  useEffect(() => { //runs once when the Map component is mounted

    //create map object
    const map = new mapboxgl.Map({
      container: mapRef.current,
      center: [-122.4194, 37.7749],
      zoom: 9,
      style: "mapbox://styles/queenelizabeth1/cmjf5sekx003301sp9fnp10lj",
    });

    //create geolocation object to automatically center map on user's location
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
      showUserHeading: true,
    });

    map.addControl(geolocate);

    // Optional: automatically center once on load
    map.on("load", () => {

      //add a source
      map.addSource("test-marker", {
        type: "geojson",
        data: "/bay-area-points.geojson"
      });

      map.loadImage('/cafe_pin.png', (error, image) => {
          if (error) throw error;
          
          // Add the image to the map style
          map.addImage('cafe-pin', image);

          // Add a layer to use the image
          map.addLayer({
              'id': 'points',
              'type': 'symbol',
              'source': 'test-marker', // GeoJSON source
              'layout': {
                  'icon-image': 'cafe-pin',
                  'icon-size': 0.025
              }
          });
      });

      geolocate.trigger();

    });

    return () => map.remove();

  }, []);

  return <div ref={mapRef} className="mapContainer" />;

}