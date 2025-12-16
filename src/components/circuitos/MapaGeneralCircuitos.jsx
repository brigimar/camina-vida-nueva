'use client';

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { motion } from "framer-motion";

// ✅ Fix para íconos de Leaflet en Next.js
const icon = L.icon({
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function MapaGeneralCircuitos({ circuitos }) {
  // ✅ Centro automático (si hay circuitos)
  const center = circuitos.length
    ? [circuitos[0].lat, circuitos[0].lng]
    : [-34.6037, -58.3816]; // fallback: CABA

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full h-[450px] rounded-xl overflow-hidden shadow-lg mb-12"
    >
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {circuitos
          .filter((c) => c.lat && c.lng)
          .map((c) => (
            <Marker key={c.id} position={[c.lat, c.lng]} icon={icon}>
              <Popup>
                <strong>{c.nombre}</strong>
                <br />
                {c.localidad}
                <br />
                <a
                  href={`/circuitos/${c.id}`}
                  className="text-indigo-600 underline"
                >
                  Ver circuito
                </a>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </motion.div>
  );
}
