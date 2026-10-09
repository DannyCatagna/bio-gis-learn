import { useEffect, useState } from "react";
import { MapContainer, Marker, Polygon, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { areas } from "@/pages/MapaInteractivo";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Límites simulados (aproximados) del SNAP — no son los polígonos oficiales
const limitesSNAP: Record<string, [number, number][]> = {
  yasuni: [[-0.55, -76.75], [-0.45, -76.2], [-0.75, -75.6], [-1.25, -75.55], [-1.45, -75.95], [-1.3, -76.55], [-0.95, -76.85]],
  cotopaxi: [[-0.56, -78.55], [-0.55, -78.33], [-0.68, -78.25], [-0.82, -78.33], [-0.8, -78.55], [-0.68, -78.62]],
  podocarpus: [[-3.85, -79.2], [-3.9, -78.95], [-4.15, -78.85], [-4.45, -78.95], [-4.4, -79.2], [-4.1, -79.3]],
};

const FlyTo = ({ position }: { position: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, 8, { duration: 1.2 });
  }, [map, position]);
  return null;
};

const MapaSatelital = () => {
  const [selectedId, setSelectedId] = useState(areas[0].id);
  const selected = areas.find((a) => a.id === selectedId) ?? areas[0];

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label htmlFor="area-select" className="text-sm font-semibold">
          Selecciona una sola área protegida:
        </label>
        <Select value={selectedId} onValueChange={setSelectedId}>
          <SelectTrigger id="area-select" className="bg-card sm:w-96">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-h-80">
            {areas.map((a) => (
              <SelectItem key={a.id} value={a.id}>
                {a.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="h-[520px] overflow-hidden rounded-xl border shadow-lg">
        <MapContainer center={selected.position} zoom={9} minZoom={6} className="h-full w-full">
          <TileLayer
            attribution="Tiles &copy; Esri"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
          {limitesSNAP[selected.id] ? (
            <Polygon
              key={selected.id}
              positions={limitesSNAP[selected.id]}
              pathOptions={{ color: "#15803d", weight: 3, fillColor: "#15803d", fillOpacity: 0.2 }}
            >
              <Popup>
                <strong>{selected.name}</strong>
                <br />
                Límite simulado del SNAP
              </Popup>
            </Polygon>
          ) : (
            <Marker key={selected.id} position={selected.position}>
              <Popup>
                <strong>{selected.name}</strong>
                <br />
                {selected.category}
              </Popup>
            </Marker>
          )}
          <FlyTo position={selected.position} />
        </MapContainer>
      </div>
      <div className="rounded-xl border border-white/20 bg-white/10 p-5 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-md">
        <p className="text-xs font-bold uppercase tracking-wide text-ocean">{selected.category}</p>
        <h3 className="mt-1 text-lg font-bold">{selected.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{selected.description}</p>
      </div>
    </div>
  );
};

export default MapaSatelital;
