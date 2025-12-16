'use client';

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// ✅ Fix para que Leaflet cargue los íconos correctamente en Next.js
const icon = L.icon({
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapaPuntoEncuentro({ lat, lng, nombre }) {
  if (!lat || !lng) {
    return (
      <p className="text-sm text-gray-500 italic">
        ⚠️ Este circuito no tiene coordenadas cargadas.
      </p>
    );
  }

  return (
    <div className="w-full h-72 rounded-xl overflow-hidden shadow-lg">
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={[lat, lng]} icon={icon}>
          <Popup>{nombre}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
