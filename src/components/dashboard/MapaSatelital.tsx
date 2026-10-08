import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { areas } from "@/pages/MapaInteractivo";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FlyTo = ({ position }: { position: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, 9, { duration: 1.2 });
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
          <Marker key={selected.id} position={selected.position}>
            <Popup>
              <strong>{selected.name}</strong>
              <br />
              {selected.category}
            </Popup>
          </Marker>
          <FlyTo position={selected.position} />
        </MapContainer>
      </div>
      <div className="rounded-xl border bg-card/70 p-5 backdrop-blur-md">
        <p className="text-xs font-bold uppercase tracking-wide text-ocean">{selected.category}</p>
        <h3 className="mt-1 text-lg font-bold">{selected.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{selected.description}</p>
      </div>
    </div>
  );
};

export default MapaSatelital;
