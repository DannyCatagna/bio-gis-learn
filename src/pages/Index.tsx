import { useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, CircleMarker, Tooltip, LayerGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  MapPin,
  Satellite,
  FileSearch,
  Layers,
  Award,
  ArrowRight,
  Flame,
  TreePine,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

/* ---------------- Capas cartográficas simuladas ---------------- */
const capas = [
  {
    id: "snap",
    label: "Áreas Protegidas (SNAP)",
    color: "hsl(var(--jungle))",
    puntos: [
      { n: "P.N. Yasuní", p: [-0.98, -76.38] as [number, number], r: 16 },
      { n: "P.N. Cotopaxi", p: [-0.68, -78.44] as [number, number], r: 11 },
      { n: "P.N. Cajas", p: [-2.84, -79.22] as [number, number], r: 10 },
      { n: "P.N. Galápagos", p: [-0.66, -90.33] as [number, number], r: 18 },
    ],
  },
  {
    id: "carbono",
    label: "Carbono Irrecuperable",
    color: "hsl(var(--ocean))",
    puntos: [
      { n: "Amazonía norte", p: [-0.4, -76.9] as [number, number], r: 20 },
      { n: "Chocó Andino", p: [0.15, -78.75] as [number, number], r: 14 },
      { n: "Manglares Esmeraldas", p: [1.05, -79.0] as [number, number], r: 12 },
    ],
  },
  {
    id: "conflicto",
    label: "Conflicto Territorial",
    color: "hsl(var(--paramo))",
    puntos: [
      { n: "Bloque petrolero ITT", p: [-1.05, -75.7] as [number, number], r: 15 },
      { n: "Frontera agrícola sur", p: [-3.6, -79.4] as [number, number], r: 12 },
    ],
  },
];

/* ---------------- Misiones (retos constructivistas) ---------------- */
const misiones = [
  {
    icon: MapPin,
    title: "Análisis Espacial",
    reto: "Identifica patrones de distribución de 3 especies endémicas usando capas SIG.",
    nivel: "Nivel 1",
    insignia: "Cartógrafo Novato",
    tono: "jungle" as const,
  },
  {
    icon: Satellite,
    title: "Datos Satelitales",
    reto: "Interpreta cobertura vegetal y detecta pérdida de bosque en el último quinquenio.",
    nivel: "Nivel 2",
    insignia: "Observador Orbital",
    tono: "ocean" as const,
  },
  {
    icon: FileSearch,
    title: "Resolución de Casos",
    reto: "Propón una zonificación para un conflicto territorial en un área protegida.",
    nivel: "Nivel 3",
    insignia: "Gestor de Conflictos",
    tono: "paramo" as const,
  },
];

const tonoClases = {
  jungle: {
    chip: "bg-jungle/10 text-jungle",
    btn: "bg-jungle text-jungle-foreground hover:bg-jungle/90",
    ring: "hover:border-jungle/50",
  },
  ocean: {
    chip: "bg-ocean/10 text-ocean",
    btn: "bg-ocean text-ocean-foreground hover:bg-ocean/90",
    ring: "hover:border-ocean/50",
  },
  paramo: {
    chip: "bg-paramo/15 text-paramo",
    btn: "bg-paramo text-paramo-foreground hover:bg-paramo/90",
    ring: "hover:border-paramo/50",
  },
};

/* ---------------- Datos simulados de los paneles ---------------- */
const especies = [
  { nombre: "Anfibios", enConflicto: 42, monitoreadas: 58 },
  { nombre: "Aves", enConflicto: 31, monitoreadas: 74 },
  { nombre: "Mamíferos", enConflicto: 24, monitoreadas: 46 },
  { nombre: "Reptiles", enConflicto: 18, monitoreadas: 29 },
  { nombre: "Plantas", enConflicto: 55, monitoreadas: 92 },
];

const carbono = [
  { name: "Amazonía", value: 54 },
  { name: "Costa", value: 21 },
  { name: "Sierra", value: 17 },
  { name: "Insular", value: 8 },
];

const pieColors = [
  "hsl(var(--jungle))",
  "hsl(var(--ocean))",
  "hsl(var(--paramo))",
  "hsl(153 30% 45%)",
];

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid hsl(var(--border))",
  background: "hsl(var(--card))",
  boxShadow: "var(--card-shadow-hover)",
  fontSize: 12,
};


const Index = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activas, setActivas] = useState<Record<string, boolean>>({
    snap: true,
    carbono: true,
    conflicto: false,
  });

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-surface">
      <DashboardSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      <div className="flex-1 min-w-0 p-4 md:p-6 space-y-6">
        {/* Encabezado compacto */}
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">Visor SIG · Biodiversidad del Ecuador</h1>
            <p className="text-sm text-muted-foreground">
              Explora capas cartográficas y avanza en tus misiones de aprendizaje.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="rounded-full bg-jungle/10 text-jungle px-3 py-1 text-xs font-semibold">
              4 capas disponibles
            </span>
            <span className="rounded-full bg-ocean/10 text-ocean px-3 py-1 text-xs font-semibold">
              SNAP 2024
            </span>
          </div>
        </header>

        {/* Visor central */}
        <section className="relative rounded-2xl overflow-hidden border bg-surface-raised card-shadow">
          <div className="h-[380px] md:h-[480px]">
            <MapContainer
              center={[-1.8312, -78.1834]}
              zoom={6}
              scrollWheelZoom
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {capas.map(
                (capa) =>
                  activas[capa.id] && (
                    <LayerGroup key={capa.id}>
                      {capa.puntos.map((pt) => (
                        <CircleMarker
                          key={pt.n}
                          center={pt.p}
                          radius={pt.r}
                          pathOptions={{
                            color: capa.color,
                            fillColor: capa.color,
                            fillOpacity: 0.35,
                            weight: 2,
                          }}
                        >
                          <Tooltip direction="top">
                            <span className="font-medium">{pt.n}</span>
                            <br />
                            <span className="text-xs">{capa.label}</span>
                          </Tooltip>
                        </CircleMarker>
                      ))}
                    </LayerGroup>
                  ),
              )}
            </MapContainer>
          </div>

          {/* Menú flotante glassmorphism */}
          <div className="absolute top-4 right-4 z-[1000] w-64 rounded-2xl glass p-4">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="h-4 w-4 text-jungle" />
              <span className="text-sm font-semibold">Capas cartográficas</span>
            </div>
            <div className="space-y-3">
              {capas.map((capa) => (
                <label
                  key={capa.id}
                  className="flex items-center justify-between gap-3 cursor-pointer min-h-[36px]"
                >
                  <span className="flex items-center gap-2 text-xs font-medium">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: capa.color }}
                    />
                    {capa.label}
                  </span>
                  <Switch
                    checked={!!activas[capa.id]}
                    onCheckedChange={(v) =>
                      setActivas((prev) => ({ ...prev, [capa.id]: v }))
                    }
                    className="data-[state=checked]:bg-jungle"
                  />
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Misiones */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <TreePine className="h-5 w-5 text-jungle" />
            <h2 className="text-lg font-bold">Retos constructivistas</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {misiones.map((m) => {
              const t = tonoClases[m.tono];
              return (
                <article
                  key={m.title}
                  className={`group rounded-2xl border bg-surface-raised p-5 card-shadow transition-all duration-300 hover:-translate-y-1 hover:card-shadow-hover ${t.ring}`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`h-11 w-11 rounded-xl grid place-items-center ${t.chip}`}>
                      <m.icon className="h-5 w-5" />
                    </div>
                    <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${t.chip}`}>
                      <Award className="h-3 w-3" />
                      {m.insignia}
                    </span>
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {m.nivel}
                  </p>
                  <h3 className="text-base font-semibold">{m.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{m.reto}</p>
                  <Link to="/guias" className="block mt-5">
                    <Button className={`w-full min-h-[44px] font-semibold transition-transform duration-200 group-hover:scale-[1.02] ${t.btn}`}>
                      Iniciar misión
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        {/* Paneles de datos */}
        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border bg-surface-raised p-5 card-shadow">
            <div className="flex items-center gap-2 mb-4">
              <Flame className="h-4 w-4 text-paramo" />
              <h3 className="text-sm font-semibold">Especies protegidas en conflicto</h3>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={especies}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="nombre" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <ReTooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid hsl(var(--border))",
                    background: "hsl(var(--card))",
                  }}
                />
                <Bar dataKey="valor" radius={[8, 8, 0, 0]} fill="hsl(var(--jungle))" animationDuration={900} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-2xl border bg-surface-raised p-5 card-shadow">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="h-4 w-4 text-ocean" />
              <h3 className="text-sm font-semibold">Carbono irrecuperable por región</h3>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={carbono}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                  isAnimationActive={false}
                >
                  {carbono.map((_, i) => (
                    <Cell key={i} fill={pieColors[i % pieColors.length]} />
                  ))}
                </Pie>
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                <ReTooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid hsl(var(--border))",
                    background: "hsl(var(--card))",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
