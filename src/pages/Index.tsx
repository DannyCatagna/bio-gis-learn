import { useState } from "react";
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
import { Layers, Flame, Trees, Ruler, Satellite } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import UnidadDosTeoria from "@/components/dashboard/UnidadDosTeoria";
import UnidadTresTeoria from "@/components/dashboard/UnidadTresTeoria";
import HojasTrabajoSIG from "@/components/dashboard/HojasTrabajoSIG";

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
    id: "ecosistemas",
    label: "Ecosistemas y Formaciones Vegetales",
    color: "hsl(var(--jungle))",
    puntos: [
      { n: "Bosque húmedo tropical · Amazonía", p: [-1.2, -76.6] as [number, number], r: 18 },
      { n: "Bosque nublado · Chocó Andino", p: [0.1, -78.7] as [number, number], r: 13 },
      { n: "Páramo de pajonal · Chimborazo", p: [-1.55, -78.8] as [number, number], r: 12 },
      { n: "Bosque seco tropical · Loja", p: [-4.0, -80.1] as [number, number], r: 12 },
      { n: "Manglar · Esmeraldas", p: [1.05, -79.0] as [number, number], r: 11 },
    ],
  },
  {
    id: "cuencas",
    label: "Cuencas Hidrográficas",
    color: "hsl(var(--ocean))",
    puntos: [
      { n: "Cuenca del Guayas", p: [-1.9, -79.6] as [number, number], r: 18 },
      { n: "Cuenca del Napo", p: [-0.9, -76.9] as [number, number], r: 17 },
      { n: "Cuenca del Esmeraldas", p: [0.55, -79.2] as [number, number], r: 13 },
      { n: "Cuenca del Pastaza", p: [-1.9, -77.4] as [number, number], r: 14 },
      { n: "Cuenca del Jubones", p: [-3.35, -79.6] as [number, number], r: 11 },
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
    id: "conflicto",
    label: "Conflicto Territorial",
    color: "hsl(var(--paramo))",
    puntos: [
      { n: "Bloque petrolero ITT", p: [-1.05, -75.7] as [number, number], r: 15 },
      { n: "Frontera agrícola sur", p: [-3.6, -79.4] as [number, number], r: 12 },
    ],
  },
];

/* ---------------- Datos oficiales SNAP ---------------- */
const kpis = [
  {
    icon: Ruler,
    valor: "26.477.811",
    unidad: "hectáreas",
    label: "Superficie conservada total",
    chip: "bg-jungle/10 text-jungle",
  },
  {
    icon: Trees,
    valor: "81",
    unidad: "áreas protegidas",
    label: "Total nacional declaradas",
    chip: "bg-ocean/10 text-ocean",
  },
  {
    icon: Flame,
    valor: "277",
    unidad: "MtC",
    label: "Carbono irrecuperable en el SNAP (32,6% nacional)",
    chip: "bg-paramo/15 text-paramo",
  },
];

const superficieData = [
  { name: "Superficie Marina", value: 79.6 },
  { name: "Superficie Terrestre", value: 20.4 },
];

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
    ecosistemas: true,
    cuencas: false,
    florafauna: false,
    endemismo: false,
    carbono: false,
    mineria: false,
    conflicto: false,
  });

  const activarCapas = (labels: string[]) => {
    const ids = capas.filter((c) => labels.includes(c.label)).map((c) => c.id);
    setActivas(() => {
      const next: Record<string, boolean> = {};
      capas.forEach((c) => (next[c.id] = ids.includes(c.id)));
      return next;
    });
    document.getElementById("visor")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-surface">
      <DashboardSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      <div className="flex-1 min-w-0">
        {/* ===================== BLOQUE 1 · Visor SIG ===================== */}
        <section
          id="visor"
          className="scroll-mt-20 bg-surface-raised px-4 py-14 md:px-10 md:py-20"
        >
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-jungle">
                  Bloque 1
                </span>
                <h1 className="mt-2 text-2xl md:text-3xl font-bold">
                  Visor SIG Interactivo · Biodiversidad del Ecuador
                </h1>
                <p className="mt-3 max-w-xl text-sm md:text-base leading-relaxed text-muted-foreground">
                  Activa y combina las capas cartográficas de ecosistemas, flora y fauna, cuencas
                  hidrográficas, endemismo y presiones territoriales.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-jungle/10 px-3 py-1 text-xs font-semibold text-jungle">
                  {capas.length} capas disponibles
                </span>
                <span className="rounded-full bg-ocean/10 px-3 py-1 text-xs font-semibold text-ocean">
                  SNAP 2024
                </span>
              </div>
            </div>

            <div className="relative mt-8 overflow-hidden rounded-2xl border bg-surface-raised card-shadow">
              <div className="h-[420px] md:h-[520px]">
                <MapContainer
                  center={[-1.8312, -78.1834]}
                  zoom={6}
                  scrollWheelZoom
                  className="h-full w-full"
                >
                  <TileLayer
                    attribution="&copy; OpenStreetMap"
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

              {/* Menú flotante de capas */}
              <div className="absolute right-4 top-4 z-[1000] w-60 md:w-72 max-h-[calc(100%-2rem)] overflow-y-auto rounded-2xl glass p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Layers className="h-4 w-4 text-jungle" />
                  <span className="text-sm font-semibold">Capas cartográficas</span>
                </div>
                <div className="space-y-3">
                  {capas.map((capa) => (
                    <label
                      key={capa.id}
                      className="flex min-h-[36px] cursor-pointer items-center justify-between gap-3"
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
            </div>

            {/* KPIs del SNAP */}
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {kpis.map((k) => (
                <article
                  key={k.label}
                  className="rounded-2xl border bg-surface p-6 card-shadow transition-shadow duration-300 hover:card-shadow-hover"
                >
                  <div className={`grid h-11 w-11 place-items-center rounded-xl ${k.chip}`}>
                    <k.icon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-3xl font-bold tracking-tight">{k.valor}</p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {k.unidad}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{k.label}</p>
                </article>
              ))}
            </div>

            {/* Paneles de datos */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border bg-surface p-6 card-shadow">
                <div className="mb-1 flex items-center gap-2">
                  <Satellite className="h-4 w-4 text-ocean" />
                  <h3 className="text-sm font-semibold">Distribución de superficie del SNAP</h3>
                </div>
                <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
                  Sobre un total conservado de{" "}
                  <span className="font-semibold text-jungle">26.477.811 hectáreas</span> en{" "}
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

              <div className="rounded-2xl border bg-surface p-6 card-shadow">
                <div className="mb-1 flex items-center gap-2">
                  <Flame className="h-4 w-4 text-paramo" />
                  <h3 className="text-sm font-semibold">Carbono irrecuperable (MtC)</h3>
                </div>
                <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
                  Las áreas del SNAP concentran{" "}
                  <span className="font-semibold text-paramo">277 MtC</span>, el{" "}
                  <span className="font-semibold text-paramo">32,6%</span> del total nacional.
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
                      formatter={(v: number) => [
                        `${String(v).replace(".", ",")} MtC`,
                        "Carbono irrecuperable",
                      ]}
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
            </div>
          </div>
        </section>

        {/* ===================== BLOQUE 2 · Unidad 2 ===================== */}
        <section className="border-t-4 border-jungle/20 bg-surface px-4 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-6xl">
            <UnidadDosTeoria />
          </div>
        </section>

        {/* ===================== BLOQUE 3 · Unidad 3 ===================== */}
        <section className="border-t-4 border-ocean/20 bg-muted/40 px-4 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-6xl">
            <UnidadTresTeoria />
          </div>
        </section>

        {/* ===================== BLOQUE 4 · Guías didácticas ===================== */}
        <section className="border-t-4 border-paramo/25 bg-surface px-4 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-6xl">
            <HojasTrabajoSIG onActivarCapas={activarCapas} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
