import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  CalendarDays,
  Map as MapIcon,
  MapPin,
  Mountain,
  Ruler,
  Search,
  TreePine,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  areasProtegidas,
  regionStyles,
  type AreaProtegida,
  type Categoria,
  type Region,
} from "@/data/areasProtegidas";

const regiones: ("Todas" | Region)[] = ["Todas", "Costa", "Sierra", "Amazonía"];
const categorias: ("Todas" | Categoria)[] = [
  "Todas",
  "Parques Nacionales",
  "Reservas Ecológicas",
  "Refugios de Vida Silvestre",
];

const fmt = (n: number) => n.toLocaleString("es-EC");

const Pill = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300",
      active
        ? "border-transparent bg-jungle text-jungle-foreground shadow-[0_6px_18px_-6px_hsl(var(--jungle))]"
        : "border-border bg-surface-raised text-muted-foreground hover:border-jungle/40 hover:text-foreground",
    )}
  >
    {children}
  </button>
);

const AreaProtegidaCard = ({
  area,
  index,
  onOpen,
}: {
  area: AreaProtegida;
  index: number;
  onOpen: () => void;
}) => {
  const s = regionStyles[area.region];
  return (
    <article
      onClick={onOpen}
      style={{ animationDelay: `${index * 60}ms` }}
      className="group cursor-pointer overflow-hidden rounded-2xl border bg-surface-raised opacity-0 animate-fade-in card-shadow transition-all duration-300 hover:-translate-y-1.5 hover:card-shadow-hover"
    >
      {/* Imagen (placeholder con overlay) */}
      <div className={cn("relative h-40 bg-gradient-to-br", s.grad)}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(0_0%_100%/0.35),transparent_60%)]" />
        <TreePine className="absolute right-4 top-4 h-16 w-16 text-background/40" />
        <span
          className={cn(
            "absolute bottom-3 left-3 rounded-full border px-2.5 py-1 text-xs font-semibold backdrop-blur-md",
            s.chip,
          )}
        >
          {area.region}
        </span>
        <div className="absolute inset-x-0 bottom-0 flex justify-center pb-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <span className="rounded-full bg-background/90 px-4 py-1.5 text-xs font-semibold text-foreground shadow-md">
            Explorar Ecosistema
          </span>
        </div>
      </div>

      <div className="space-y-2 p-4">
        <h3 className="text-base font-bold leading-snug">{area.nombre}</h3>
        <p className="text-xs text-muted-foreground">{area.categoria}</p>
        <div className="flex items-center gap-1.5 pt-1 text-sm font-semibold text-jungle">
          <Ruler className="h-4 w-4" />
          {fmt(area.hectareas)} ha
        </div>
      </div>
    </article>
  );
};

const AreasProtegidasExplorer = () => {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [region, setRegion] = useState<"Todas" | Region>("Todas");
  const [categoria, setCategoria] = useState<"Todas" | Categoria>("Todas");
  const [selected, setSelected] = useState<AreaProtegida | null>(null);

  const filtradas = useMemo(
    () =>
      areasProtegidas.filter(
        (a) =>
          (region === "Todas" || a.region === region) &&
          (categoria === "Todas" || a.categoria === categoria) &&
          (a.nombre.toLowerCase().includes(q.toLowerCase()) ||
            a.provincia.toLowerCase().includes(q.toLowerCase())),
      ),
    [q, region, categoria],
  );

  return (
    <section className="space-y-6">
      {/* Cabecera */}
      <header className="space-y-2">
        <h2 className="text-2xl font-bold sm:text-3xl">Explorador del SNAP Continental</h2>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
          Descubre la megadiversidad de nuestras áreas protegidas terrestres. Filtra por región o
          categoría de manejo.
        </p>
      </header>

      {/* Filtros */}
      <div className="space-y-4 rounded-2xl border bg-surface-raised p-4 card-shadow">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nombre o provincia…"
            className="h-11 pl-9"
          />
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {regiones.map((r) => (
              <Pill key={r} active={region === r} onClick={() => setRegion(r)}>
                {r}
              </Pill>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {categorias.map((c) => (
              <Pill key={c} active={categoria === c} onClick={() => setCategoria(c)}>
                {c}
              </Pill>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          {filtradas.length} área{filtradas.length === 1 ? "" : "s"} protegida
          {filtradas.length === 1 ? "" : "s"} encontrada{filtradas.length === 1 ? "" : "s"}
        </p>
      </div>

      {/* Grid */}
      {filtradas.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          No se encontraron áreas con esos criterios.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtradas.map((a, i) => (
            <AreaProtegidaCard
              key={a.id}
              area={a}
              index={i}
              onOpen={() => setSelected(a)}
            />
          ))}
        </div>
      )}

      {/* Detalle */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="glass max-h-[90vh] max-w-2xl overflow-y-auto border-0 p-0">
          {selected && (
            <>
              <div
                className={cn(
                  "relative h-44 bg-gradient-to-br",
                  regionStyles[selected.region].grad,
                )}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,hsl(0_0%_100%/0.4),transparent_65%)]" />
                <Mountain className="absolute bottom-4 right-6 h-20 w-20 text-background/40" />
                <div className="absolute bottom-4 left-5 space-y-2 pr-24">
                  <span
                    className={cn(
                      "inline-block rounded-full border px-2.5 py-1 text-xs font-semibold backdrop-blur-md",
                      regionStyles[selected.region].chip,
                    )}
                  >
                    {selected.region} · {selected.categoria}
                  </span>
                  <h3 className="text-xl font-bold leading-tight sm:text-2xl">
                    {selected.nombre}
                  </h3>
                </div>
              </div>

              <div className="space-y-5 p-6">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {selected.descripcion}
                </p>

                {/* Datos clave */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    { icon: CalendarDays, label: "Año de creación", value: String(selected.anio) },
                    { icon: Mountain, label: "Rango altitudinal", value: selected.altitud },
                    { icon: MapPin, label: "Provincia", value: selected.provincia },
                  ].map((d) => (
                    <div key={d.label} className="rounded-xl border bg-surface-raised/80 p-3">
                      <d.icon className="mb-1.5 h-4 w-4 text-jungle" />
                      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                        {d.label}
                      </p>
                      <p className="text-sm font-semibold leading-snug">{d.value}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border bg-surface-raised/80 p-3">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Superficie
                  </p>
                  <p className="text-lg font-bold text-jungle">{fmt(selected.hectareas)} ha</p>
                </div>

                {/* Reto / conflicto */}
                <div className="flex items-start gap-3 rounded-xl border border-paramo/40 bg-paramo/10 p-4">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-paramo" />
                  <div>
                    <p className="text-sm font-semibold text-paramo-foreground">
                      Presión antrópica identificada
                    </p>
                    <p className="text-sm text-muted-foreground">{selected.reto}</p>
                  </div>
                </div>

                <Button
                  className="w-full bg-ocean text-ocean-foreground hover:bg-ocean/90"
                  onClick={() => navigate("/mapa")}
                >
                  <MapIcon className="mr-2 h-4 w-4" />
                  Ver en el Mapa SIG
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default AreasProtegidasExplorer;
