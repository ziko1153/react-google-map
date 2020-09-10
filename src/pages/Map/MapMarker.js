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

  const [name, setName] = useState("Tahmid Ziko");

  const [selected, setSelected] = useState(null);

  //// Check User Device Location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
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

  //    Return JSX
  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={position}
        options={options}
      >
        <Marker
          position={position}
          onClick={() => {
            setSelected(position);
          }}
        />

        {/*  Here If Select on Marker then condition will be true */}
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
            <div className="google-info-window">
              <div>
                <label>Current Coordinates</label>
                <input
                  type="text"
                  value={`Latitude: ${position.lat},Longitude: ${position.lng}`}
                  readOnly
                />

                <label>My Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => {
                    setName(e.target.value);
                  }}
                />

                <button
                  onClick={() => {
                    console.log(
                      `Latitude : ${position.lat}\nLongitude : ${position.lng}
                      \nMy Name is: ${name}
                      
                      `
                    );
                  }}
                >
                  Send Data To Console
                </button>
              </div>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
};

export default MapMarker;
