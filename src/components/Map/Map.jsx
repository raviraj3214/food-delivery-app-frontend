import { useEffect, useState } from "react";
import PropTypes from "prop-types"; 
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.module.css";

const CustomMap = ({ address, site, name, phoneNumber }) => {
  const [position, setPosition] = useState([51.505, -0.09]); 
  const [error, setError] = useState(null);

  const getLastThreeWords = (str) => {
    if (!str) return "";
    const words = str.trim().split(/\s+/); 
    return words.slice(-3).join(" "); 
  };

  useEffect(() => {
    const geocodeAddress = async () => {
      try {
        const lastThreeWords = getLastThreeWords(address); // Extract last three words
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address
          )}`
        );
        const data = await response.json();
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          setPosition([parseFloat(lat), parseFloat(lon)]);
        } else {
          throw new Error("Address not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to locate the address.");
      }
    };

    if (address) {
      geocodeAddress();
    }
  }, [address]);

  return (
    <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "400px", borderRadius: "12px", overflow: "hidden" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
       
          <Marker position={position}>
            <Popup autoPan={false}>
              <div className="custom-popup">
                <h2>{name}</h2>
                <p>
                  <strong>Address:</strong> {address}
                </p>
                <p>
                  <strong>Phone number:</strong> {phoneNumber}
                </p>
                <p>
                  <strong>Website:</strong>{" "}
                  <a href={site} target="_blank" rel="noreferrer">
                    {site}
                  </a>
                </p>
              </div>
            </Popup>
          </Marker>
      
        {error && <div style={{ color: "red" }}>{error}</div>}
      </MapContainer>
    </div>
  );
};

// PropTypes definition
CustomMap.propTypes = {
  address: PropTypes.string.isRequired, 
  site: PropTypes.string.isRequired,   
  name: PropTypes.string.isRequired,   
  phoneNumber: PropTypes.string.isRequired, 
};

export default CustomMap;
