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
  Droplets,
  Ship,
  Mountain,
  Info,
  Trees,
  Ruler,
  Lightbulb,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import FundamentacionTeorica from "@/components/dashboard/FundamentacionTeorica";
import GuiasSIG from "@/components/dashboard/GuiasSIG";


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
  {
    id: "florafauna",
    label: "Flora y Fauna Emblemática",
    color: "hsl(var(--jungle))",
    puntos: [
      { n: "Oso andino · Cayambe Coca", p: [-0.13, -77.95] as [number, number], r: 12 },
      { n: "Cóndor andino · Antisana", p: [-0.48, -78.14] as [number, number], r: 11 },
      { n: "Jaguar · Cuyabeno", p: [-0.25, -76.18] as [number, number], r: 13 },
      { n: "Manglar · Churute", p: [-2.42, -79.62] as [number, number], r: 10 },
    ],
  },
  {
    id: "mineria",
    label: "Conflictos Mineros y Agrícolas",
    color: "hsl(var(--paramo))",
    puntos: [
      { n: "Minería · Cordillera del Cóndor", p: [-3.5, -78.3] as [number, number], r: 14 },
      { n: "Minería · Íntag (Chocó Andino)", p: [0.35, -78.55] as [number, number], r: 11 },
      { n: "Expansión agrícola · Manabí", p: [-1.05, -80.2] as [number, number], r: 12 },
    ],
  },
  {
    id: "endemismo",
    label: "Endemismo (rango restringido)",
    color: "hsl(var(--ocean))",
    puntos: [
      { n: "Frailejones · R.E. El Ángel", p: [0.72, -78.0] as [number, number], r: 12 },
      { n: "Anfibios · Chocó Andino", p: [0.05, -78.68] as [number, number], r: 11 },
      { n: "Orquídeas · Podocarpus", p: [-4.12, -79.13] as [number, number], r: 11 },
    ],
  },
];


/* ---------------- Misiones (retos constructivistas) ---------------- */
const misiones = [
  {
    icon: Droplets,
    title: "Misión 1 · Seguridad Hídrica",
    reto: "Identifica el área que abastece de recursos hídricos a infraestructuras clave como la Central Coca Codo Sinclair y el sistema Papallacta.",
    solucion: "Parque Nacional Cayambe Coca",
    nivel: "Nivel 1",
    insignia: "Guardián del Agua",
    tono: "ocean" as const,
  },
  {
    icon: Ship,
    title: "Misión 2 · Presiones Antrópicas",
    reto: "Localiza el único parque nacional del subtrópico árido costero que sufre presiones por pesca de arrastre ilegal y expansión urbana no planificada.",
    solucion: "Parque Nacional Machalilla",
    nivel: "Nivel 2",
    insignia: "Gestor de Conflictos",
    tono: "paramo" as const,
  },
  {
    icon: Mountain,
    title: "Misión 3 · Endemismo Andino",
    reto: "Explora el páramo húmedo donde habita de manera exclusiva el frailejón con hojas en roseta recubiertas por densas vellosidades blanquecinas.",
    solucion: "Reserva Ecológica El Ángel",
    nivel: "Nivel 3",
    insignia: "Botánico de Altura",
    tono: "jungle" as const,
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

/* ---------------- Datos oficiales SNAP ---------------- */
const SNAP_DEFINICION =
  "El SNAP integra áreas terrestres, marinas e insulares de importancia ecológica y sociocultural, cuya gestión contribuye a la protección de la biodiversidad, el mantenimiento de los servicios ecosistémicos y el desarrollo sostenible del país.";

const kpis = [
  {
    icon: Ruler,
    valor: "26.477.811",
    unidad: "hectáreas",
    label: "Superficie conservada total",
    tono: "jungle" as const,
  },
  {
    icon: Trees,
    valor: "81",
    unidad: "áreas protegidas",
    label: "Total nacional declaradas",
    tono: "ocean" as const,
  },
  {
    icon: Flame,
    valor: "277",
    unidad: "MtC",
    label: "Carbono irrecuperable en el SNAP (32,6% nacional)",
    tono: "paramo" as const,
  },
];

/* Distribución de superficie del SNAP */
const superficieData = [
  { name: "Superficie Marina", value: 79.6 },
  { name: "Superficie Terrestre", value: 20.4 },
];

/* Carbono irrecuperable: SNAP frente al total nacional */
const CARBONO_SNAP = 277;
const CARBONO_PORCENTAJE = 32.6;
const CARBONO_NACIONAL = Math.round((CARBONO_SNAP / (CARBONO_PORCENTAJE / 100)) * 10) / 10;
const carbonoData = [
  { nombre: "Dentro del SNAP", valor: CARBONO_SNAP },
  { nombre: "Fuera del SNAP", valor: Math.round((CARBONO_NACIONAL - CARBONO_SNAP) * 10) / 10 },
];


const pieColors = ["hsl(var(--ocean))", "hsl(var(--jungle))"];

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

  const activarCapas = (labels: string[]) => {
    const ids = capas.filter((c) => labels.includes(c.label)).map((c) => c.id);
    setActivas((prev) => {
      const next = { ...prev };
      capas.forEach((c) => (next[c.id] = ids.includes(c.id)));
      return next;
    });
    document.getElementById("visor")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };




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
              {capas.length} capas disponibles
            </span>

            <span className="rounded-full bg-ocean/10 text-ocean px-3 py-1 text-xs font-semibold">
              SNAP 2024
            </span>
          </div>
        </header>

        {/* Visor central */}
        <section id="visor" className="relative scroll-mt-20 rounded-2xl overflow-hidden border bg-surface-raised card-shadow">

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

        {/* Definición oficial del SNAP */}
        <section className="rounded-2xl border bg-surface-raised p-6 md:p-8 card-shadow">
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-5 w-5 text-ocean" />
            <h2 className="text-base md:text-lg font-bold">
              Sistema Nacional de Áreas Protegidas (SNAP)
            </h2>
          </div>
          <p className="max-w-4xl text-sm md:text-base leading-relaxed text-muted-foreground">
            {SNAP_DEFINICION}
          </p>
        </section>

        {/* KPIs */}
        <section className="grid gap-4 md:grid-cols-3">
          {kpis.map((k) => {
            const t = tonoClases[k.tono];
            return (
              <article
                key={k.label}
                className="rounded-2xl border bg-surface-raised p-6 card-shadow transition-shadow duration-300 hover:card-shadow-hover"
              >
                <div className={`h-11 w-11 rounded-xl grid place-items-center ${t.chip}`}>
                  <k.icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-3xl font-bold tracking-tight">{k.valor}</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {k.unidad}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{k.label}</p>
              </article>
            );
          })}
        </section>

        {/* Fundamentación teórica */}
        <FundamentacionTeorica />

        {/* Guías didácticas SIG */}
        <GuiasSIG onActivarCapas={activarCapas} />


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
                  <details className="mt-4 rounded-xl border bg-surface p-3">
                    <summary className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-foreground">
                      <Lightbulb className="h-3.5 w-3.5 text-paramo" />
                      Ver solución esperada
                    </summary>
                    <p className={`mt-2 rounded-lg px-3 py-2 text-sm font-semibold ${t.chip}`}>
                      {m.solucion}
                    </p>
                  </details>

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
          {/* Distribución de superficie */}
          <div className="rounded-2xl border bg-surface-raised p-6 card-shadow transition-shadow duration-300 hover:card-shadow-hover">
            <div className="flex items-center gap-2 mb-1">
              <Layers className="h-4 w-4 text-ocean" />
              <h3 className="text-sm font-semibold">Distribución de superficie del SNAP</h3>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground mb-4">
              Sobre un total conservado de{" "}
              <span className="font-semibold text-jungle">26.477.811 hectáreas</span> distribuidas en{" "}
              <span className="font-semibold text-jungle">81 áreas protegidas</span> declaradas.
            </p>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={superficieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  innerRadius={58}
                  outerRadius={95}
                  paddingAngle={3}
                  cornerRadius={6}
                  stroke="hsl(var(--card))"
                  strokeWidth={2}
                  animationDuration={1200}
                  animationEasing="ease-out"
                  label={({ value }) => `${String(value).replace(".", ",")}%`}
                  labelLine={false}
                >
                  {superficieData.map((entry, i) => (
                    <Cell key={entry.name} fill={pieColors[i % pieColors.length]} />
                  ))}
                </Pie>
                <ReTooltip
                  contentStyle={tooltipStyle}
                  formatter={(v: number, n: string) => [`${String(v).replace(".", ",")}%`, n]}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Carbono irrecuperable */}
          <div className="rounded-2xl border bg-surface-raised p-6 card-shadow transition-shadow duration-300 hover:card-shadow-hover">
            <div className="flex items-center gap-2 mb-1">
              <Flame className="h-4 w-4 text-paramo" />
              <h3 className="text-sm font-semibold">Carbono irrecuperable (MtC)</h3>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground mb-4">
              Las áreas protegidas del SNAP concentran{" "}
              <span className="font-semibold text-paramo">277 MtC</span> de carbono irrecuperable, lo
              que corresponde al <span className="font-semibold text-paramo">32,6%</span> del total
              nacional.
            </p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={carbonoData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradCarbono" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--paramo))" stopOpacity={1} />
                    <stop offset="100%" stopColor="hsl(var(--paramo))" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis
                  dataKey="nombre"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                />
                <ReTooltip
                  cursor={{ fill: "hsl(var(--muted))", opacity: 0.5 }}
                  contentStyle={tooltipStyle}
                  formatter={(v: number) => [`${String(v).replace(".", ",")} MtC`, "Carbono irrecuperable"]}
                />
                <Bar
                  name="Carbono irrecuperable"
                  dataKey="valor"
                  radius={[8, 8, 0, 0]}
                  animationDuration={1100}
                  animationEasing="ease-out"
                >
                  {carbonoData.map((d, i) => (
                    <Cell
                      key={d.nombre}
                      fill={i === 0 ? "url(#gradCarbono)" : "hsl(var(--muted-foreground) / 0.35)"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
        </div>
      </div>

    </div>
  );
};

export default Index;
