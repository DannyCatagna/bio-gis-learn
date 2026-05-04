import { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, Leaf, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Fix default marker icons (Leaflet + bundlers)
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface ProtectedArea {
  id: string;
  name: string;
  position: [number, number];
  zoom: number;
  description: string;
  status: string;
}

const areas: ProtectedArea[] = [
  {
    id: "yasuni",
    name: "Parque Nacional Yasuní",
    position: [-0.9833, -76.3833],
    zoom: 9,
    description:
      "Uno de los lugares con mayor biodiversidad del planeta. Alberga miles de especies de árboles, aves, anfibios y mamíferos en plena Amazonía ecuatoriana, incluyendo pueblos indígenas en aislamiento voluntario.",
    status: "Reserva de Biósfera UNESCO",
  },
  {
    id: "cotopaxi",
    name: "Parque Nacional Cotopaxi",
    position: [-0.6803, -78.4378],
    zoom: 11,
    description:
      "Ecosistema de páramo andino dominado por el volcán Cotopaxi (5897 m). Hábitat de cóndores, lobos de páramo, venados y vegetación de altura clave para la regulación hídrica del país.",
    status: "Área protegida del SNAP — Sierra",
  },
  {
    id: "galapagos",
    name: "Parque Nacional Galápagos",
    position: [-0.7893, -90.9648],
    zoom: 7,
    description:
      "Archipiélago volcánico con especies endémicas únicas que inspiraron la teoría de la evolución de Darwin. Tortugas gigantes, iguanas marinas y piqueros de patas azules definen este laboratorio natural.",
    status: "Patrimonio Natural de la Humanidad",
  },
  {
    id: "cajas",
    name: "Parque Nacional Cajas",
    position: [-2.8456, -79.2256],
    zoom: 11,
    description:
      "Sistema lacustre de páramo con más de 200 lagunas. Fuente principal de agua para la ciudad de Cuenca y refugio de flora endémica de altura.",
    status: "Sitio Ramsar",
  },
  {
    id: "machalilla",
    name: "Parque Nacional Machalilla",
    position: [-1.5167, -80.7667],
    zoom: 10,
    description:
      "Único parque nacional costero del Ecuador continental. Protege bosque seco tropical, playas y la Isla de la Plata, importante zona de reproducción de ballenas jorobadas.",
    status: "Área marino-costera protegida",
  },
];

const FlyToHandler = ({ target }: { target: ProtectedArea | null }) => {
  const map = useMap();
  if (target) {
    map.flyTo(target.position, target.zoom, { duration: 1.5 });
  }
  return null;
};

const MapaInteractivo = () => {
  const [selected, setSelected] = useState<ProtectedArea | null>(null);
  const markerRefs = useRef<Record<string, L.Marker | null>>({});

  const handleSelect = (area: ProtectedArea) => {
    setSelected(area);
    setTimeout(() => {
      markerRefs.current[area.id]?.openPopup();
    }, 1600);
  };

  return (
    <div className="container py-10">
      <div className="mb-8 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
          Mapa Interactivo — SNAP Ecuador
        </h1>
        <p className="text-muted-foreground">
          Explora las áreas protegidas del Sistema Nacional de Áreas Protegidas del Ecuador.
          Haz clic en un área de la lista o en un marcador del mapa para conocer más.
        </p>
      </div>

      <div className="grid lg:grid-cols-[300px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                Áreas Protegidas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {areas.map((a) => {
                const active = selected?.id === a.id;
                return (
                  <button
                    key={a.id}
                    onClick={() => handleSelect(a)}
                    className={`w-full text-left px-3 py-2.5 rounded-md text-sm transition-colors flex items-start gap-2 ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted text-foreground"
                    }`}
                  >
                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                    <span className="font-medium leading-snug">{a.name}</span>
                  </button>
                );
              })}
            </CardContent>
          </Card>
        </aside>

        {/* Map */}
        <div className="rounded-xl overflow-hidden border card-shadow h-[600px]">
          <MapContainer
            center={[-1.8312, -78.1834]}
            zoom={6}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FlyToHandler target={selected} />
            {areas.map((a) => (
              <Marker
                key={a.id}
                position={a.position}
                ref={(ref) => {
                  markerRefs.current[a.id] = ref;
                }}
                eventHandlers={{
                  click: () => setSelected(a),
                }}
              >
                <Popup maxWidth={300} minWidth={260}>
                  <div className="space-y-2">
                    <div className="aspect-video bg-secondary/30 rounded-md flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-primary/40" />
                    </div>
                    <h3 className="font-semibold text-base text-primary !m-0">
                      {a.name}
                    </h3>
                    <span className="inline-block text-xs px-2 py-0.5 rounded bg-secondary/40 text-foreground">
                      {a.status}
                    </span>
                    <p className="text-sm text-foreground !mt-2 leading-relaxed">
                      {a.description}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Selected detail card (mobile-friendly) */}
      {selected && (
        <Card className="mt-6 lg:hidden">
          <CardHeader>
            <CardTitle className="text-primary">{selected.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <span className="inline-block text-xs px-2 py-1 rounded bg-secondary/40">
              {selected.status}
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {selected.description}
            </p>
            <Button variant="outline" size="sm" onClick={() => setSelected(null)}>
              Cerrar
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MapaInteractivo;
