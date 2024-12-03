import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.module.css";

const CustomMap = () => {
  return (
    <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "400px", borderRadius: "12px", overflow: "hidden" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* McDonald's Marker */}
        <Marker position={[51.505, -0.09]}>
          <Popup>
            <div className="custom-popup">
              <h2>McDonald's</h2>
              <p>
                <strong>South London</strong>
              </p>
              <p>Tooley St, London Bridge, London SE1 2TF, United Kingdom</p>
              <p>
                <strong>Phone number:</strong> +934443-43
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a href="http://mcdonalds.uk/" target="_blank" rel="noreferrer">
                  http://mcdonalds.uk/
                </a>
              </p>
            </div>
          </Popup>
        </Marker>

        {/* Burger King Marker */}
        <Marker position={[51.515, -0.1]}>
          <Popup>
            <div className="custom-popup">
              <h2>Burger King</h2>
              <p>
                <strong>Central London</strong>
              </p>
              <p>Victoria St, London, SW1E 5ND, United Kingdom</p>
              <p>
                <strong>Phone number:</strong> +934555-21
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a href="http://burgerking.uk/" target="_blank" rel="noreferrer">
                  http://burgerking.uk/
                </a>
              </p>
            </div>
          </Popup>
        </Marker>

      </MapContainer>
    </div>
  );
};

export default CustomMap;
