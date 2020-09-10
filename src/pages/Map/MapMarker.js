import React, { useState, useEffect } from "react";
import "../Map/Marker.css";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};

const options = {
  zoomControl: true,
  scrollwheel: false,
};

const MapMarker = () => {
  const { isLoaded, LoadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const [position, setPosition] = useState(null);

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);
  if (LoadError) return "Error Loading Map";
  if (!isLoaded) return "Loading Map";
  if (!position)
    return "Please Confirm Your Location Again Reload Please. I'm Waiting.. ";
  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={position}
        options={options}
        onClick={event => {
          console.log("lat", event.latLng.lat());
          console.log("long", event.latLng.lng());
          setSelected(null);
        }}
      >
        <Marker
          position={position}
          onClick={() => {
            setSelected(position);
          }}
        />

        {selected ? (
          <InfoWindow
            position={{
              lat: selected.lat + 0.002,
              lng: selected.lng + 0.0001,
            }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div className="google-info-window">Hello</div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
};

export default MapMarker;
